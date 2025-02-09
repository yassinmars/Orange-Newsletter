import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Calendar } from "lucide-react";

interface CreateNewsletterProps {
  onClose: () => void;
  onSubmit?: (newsletter: {
    title: string;
    content: string;
    scheduledDate?: string;
  }) => void;
}

const CreateNewsletter = ({ onClose, onSubmit }: CreateNewsletterProps) => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (onSubmit) {
      onSubmit({
        title,
        content,
        scheduledDate: scheduledDate || undefined,
      });
    }

    toast({
      title: "Success",
      description: "Newsletter created successfully",
    });
    onClose();
  };

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl font-bold text-gray-900">Create Newsletter</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter newsletter title"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter newsletter content"
            className="w-full min-h-[200px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            required
          />
        </div>
        <div>
          <label htmlFor="scheduledDate" className="block text-sm font-medium text-gray-700">
            Schedule Date (Optional)
          </label>
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-500" />
            <Input
              id="scheduledDate"
              type="date"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
            Create Newsletter
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewsletter;