import { useState, React } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Calendar } from "lucide-react";
import axios from "axios";

const UpdateNewsLetter = ({ onClose, id, onNewsletterChanged, newsletter }) => {
  const newsletterId = id;
  const item = newsletter.find((n) => n.id === newsletterId);

  const { toast } = useToast();
  const [Title, setTitle] = useState(item.Title);
  const [Description, setDescription] = useState(item.Description);
  const [Date, setScheduledDate] = useState(item.Date);
  const [Category, setCategory] = useState(item.Category);
  const [Links, setLinks] = useState(item.Links);
  const [Image, setImage] = useState("");
  const [Video, setVideo] = useState(item.Video);

  const handleUpdate = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Title", Title);
    formData.append("Description", Description);
    formData.append("Category", Category);
    formData.append("Links", Links);
    formData.append("Video", Video);
    formData.append("Date", Date);

    // Check if an Image is selected
    if (Image) {
      formData.append("file", Image); // Add the Image file
    }

    axios
      .put(`http://localhost:6005/api/putNewsletter/${newsletterId}`, formData)
      .then((res) => {
        console.log("Newsletter updated successfully");
        toast({ title: "Newsletter updated successfully", status: "success" });
        onNewsletterChanged(); // Call the function to refresh the newsletter list
      })
      .catch((e) => {
        console.error("Failed to update the Newsletter", e);
        toast({ title: "Update failed", status: "error" });
      });

    onClose();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900">Update Newsletter</h2>
      <form
        className="space-y-1"
        onSubmit={(e) => {
          handleUpdate(e);
        }}
      >
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
            placeholder="Enter newsletter Title"
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
            onChange={(e) => setImage(e.target.files[0])}
            //required
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
              type="date"
              value={Date}
              onChange={(e) => setScheduledDate(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
            Update Newsletter
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateNewsLetter;
