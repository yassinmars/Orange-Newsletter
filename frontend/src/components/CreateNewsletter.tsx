import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Calendar } from "lucide-react";
import axios from "axios";

const CreateNewsletter = ({ onClose }: { onClose: () => void }) => {
  const { toast } = useToast();
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Date, setDate] = useState("");
  const [Category, setCategory] = useState("");
  const [Links, setLinks] = useState("");
  const [Image, setImage] = useState("");
  const [Video, setVideo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    // Creating a new FormData object
    const formData = new FormData();
    formData.append('Title', Title);
    formData.append('Description', Description);
    formData.append('Category', Category);
    formData.append('Links', Links);
    formData.append('Video', Video);
    formData.append('Date', Date);
  
    // Check if an Image is selected
    if (Image) {
      formData.append('file', Image); // Add the Image file
    }
  
    toast({
      title: "Success",
      description: "Newsletter created successfully",
    });
  
    axios
      .post("http://localhost:6005/api/addNewsletter", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Newsletter Created successfully", response.data);
        onClose();
      })
      .catch((error) => {
        console.error("There was an issue creating a newsletter", error);
      });
    onClose();
  };
  

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl font-bold text-gray-900">Create Newsletter</h2>
      <form onSubmit={handleSubmit} className="space-y-4" enctype="multipart/form-data">
        <div>
          <label
            htmlFor="Title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <Input
            id="Title"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter newsletter title"
            required
          />
        </div>

        <div>
          <label
            htmlFor="Category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <Input
            id="Category"
            value={Category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter Category"
            required
          />
        </div>

        <div>
          <label
            htmlFor="Links"
            className="block text-sm font-medium text-gray-700"
          >
            Link
          </label>
          <Input
            id="Links"
            value={Links}
            onChange={(e) => setLinks(e.target.value)}
            placeholder="Enter URL"
            required
          />
        </div>

        <div>
          <label
            htmlFor="Video"
            className="block text-sm font-medium text-gray-700"
          >
            Video URL
          </label>
          <Input
            id="Video"
            value={Video}
            onChange={(e) => setVideo(e.target.value)}
            placeholder="Enter URL"
            required
          />
        </div>

        <div>
          <label
            htmlFor="Image"
            className="block text-sm font-medium text-gray-700"
          >
            Image
          </label>
          <Input
            id="Image"
            type="file"
            name="file"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>

        <div>
          <label
            htmlFor="Description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="Description"
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter newsletter Description"
            className="w-full min-h-[200px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            required
          />
        </div>

        <div>
          <label
            htmlFor="Date"
            className="block text-sm font-medium text-gray-700"
          >
            Schedule Date
          </label>
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-500" />
            <Input
              id="Date"
              type="Date"
              value={Date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600"
            onClick={handleSubmit}
          >
            Create Newsletter
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewsletter;
