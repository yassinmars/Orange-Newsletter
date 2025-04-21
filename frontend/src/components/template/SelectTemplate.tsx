import React, { useState } from "react";
import {
  Layout,
  Plus,
  Save,
  Trash2,
  Copy,
  Edit2,
  Check,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type Template = {
  id: string;
  name: string;
  layout: "single-column" | "two-column" | "featured";
  headerImage?: string;
  sections: {
    id: string;
    type: "text" | "image" | "button";
    position: number;
  }[];
};

import { useLocation } from "react-router-dom";

const SelectTemplate = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [editingName, setEditingName] = useState<string | null>(null);
  const [newTemplateName, setNewTemplateName] = useState("");

  const location = useLocation();
  const { filteredNewslettersData } = location.state || {};
  console.log(filteredNewslettersData);

  const navigate = useNavigate();

  const createTemplate = (layout: Template["layout"]) => {
    const newTemplate: Template = {
      id: Date.now().toString(),
      name: "New Template",
      layout,
      sections: [],
      headerImage: "https://source.unsplash.com/random/1200x400",
    };
    setTemplates([...templates, newTemplate]);
    setEditingName(newTemplate.id);
    setNewTemplateName(newTemplate.name);
  };

  const deleteTemplate = (id: string) => {
    setTemplates(templates.filter((t) => t.id !== id));
  };

  const duplicateTemplate = (template: Template) => {
    const newTemplate = {
      ...template,
      id: Date.now().toString(),
      name: `${template.name} (Copy)`,
    };
    setTemplates([...templates, newTemplate]);
  };

  const saveTemplateName = (id: string) => {
    setTemplates(
      templates.map((t) => (t.id === id ? { ...t, name: newTemplateName } : t))
    );
    setEditingName(null);
  };

  const renderTemplateCard = (template: Template) => (
    <div
      key={template.id}
      className="bg-white rounded-lg shadow-md p-6 space-y-4"
    >
      <div className="flex items-center justify-between">
        {editingName === template.id ? (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newTemplateName}
              onChange={(e) => setNewTemplateName(e.target.value)}
              className="border rounded px-2 py-1"
              autoFocus
            />
            <button
              onClick={() => saveTemplateName(template.id)}
              className="text-green-600 hover:text-green-700"
            >
              <Check className="w-5 h-5" />
            </button>
            <button
              onClick={() => setEditingName(null)}
              className="text-red-600 hover:text-red-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold">{template.name}</h3>
            <button
              onClick={() => {
                setEditingName(template.id);
                setNewTemplateName(template.name);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
        )}
        <div className="flex space-x-2">
          <button
            onClick={() => duplicateTemplate(template)}
            className="text-blue-600 hover:text-blue-700"
          >
            <Copy className="w-5 h-5" />
          </button>
          <button
            onClick={() => deleteTemplate(template.id)}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
        {template.headerImage && (
          <img
            src={template.headerImage}
            alt="Template preview"
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <span className="text-white font-medium">
            {template.layout} Layout
          </span>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" />
          Use Template
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center space-x-2">
            <Layout className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-800">
              Newsletter Template Builder
            </h1>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Create New Template
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() =>
                navigate("/createTemplate", {
                  state: { filteredNewslettersData },
                })
              }
              className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <Plus className="w-8 h-8 text-blue-600 mb-2" />
              <span className="font-medium">Single Column</span>
            </button>
            <button
              onClick={() => createTemplate("two-column")}
              className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <Plus className="w-8 h-8 text-blue-600 mb-2" />
              <span className="font-medium">Two Column</span>
            </button>
            <button
              onClick={() => createTemplate("featured")}
              className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <Plus className="w-8 h-8 text-blue-600 mb-2" />
              <span className="font-medium">Featured Layout</span>
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Newsletters</h2>
          {templates.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-gray-500">
                No templates yet. Create one to get started!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map(renderTemplateCard)}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SelectTemplate;
