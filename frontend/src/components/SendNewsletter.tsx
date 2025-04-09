import { useState, useEffect } from "react";
import { Mail, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Newsletter } from "@/types/newsletter";
import NewsletterGrid from "./newsletter/NewsletterGrid";
import SendDialog from "./newsletter/SendDialog";
import {
  generateEmailContent,
  openEmailClient,
} from "./newsletter/EmailContentGenerator";
import axios from "axios";
import { Send } from "lucide-react";
import { SquareDashedMousePointer } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SendNewsletter = () => {
  const { toast } = useToast();
  const [selectedNewsletters, setSelectedNewsletters] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [previewMode, setPreviewMode] = useState(false);
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);

  const navigate = useNavigate();

  const fetchNewsletters = async () => {
    setIsLoading(true);
    axios
      .get("http://localhost:6005/api/newsletter")
      .then((res) => {
        setNewsletters(res.data.Newsletter); // Set the newsletters state
        setIsLoading(false);
      })
      .catch((err) => console.error("Error fetching newsletters:", err));
  };

  useEffect(() => {
    fetchNewsletters();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="mb-4">Page is loading, please wait.</h1>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const toggleNewsletter = (id: number) => {
    setSelectedNewsletters((prev) =>
      prev.includes(id)
        ? prev.filter((newsletterId) => newsletterId !== id)
        : [...prev, id]
    );
  };

  const handleSendEmail = () => {
    if (selectedNewsletters.length === 0) {
      toast({
        title: "No newsletters selected",
        description: "Please select at least one newsletter to send",
        variant: "destructive",
      });
      return;
    }

    const selectedItems = newsletters.filter((newsletter) =>
      selectedNewsletters.includes(newsletter.id)
    );

    const { subject, body } = generateEmailContent(selectedItems);
    openEmailClient(subject, body);
  };

  const filteredNewsletters = previewMode
    ? newsletters.filter((newsletter) =>
        selectedNewsletters.includes(newsletter.id)
      )
    : newsletters;

  const filteredNewslettersData = newsletters.filter((newsletter) =>
    selectedNewsletters.includes(newsletter.id)
  );

  console.log(filteredNewslettersData);

  return (
    <div className="space-y-5 p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <Mail className="h-5 w-5 text-orange-500" />
          <h2 className="text-2xl font-bold text-gray-900">
            {previewMode ? "Preview Newsletters" : "Send Newsletters"}
          </h2>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => setPreviewMode(!previewMode)}
            className="flex items-center space-x-2"
          >
            <Eye className="h-4 w-4" />
            <span>{previewMode ? "Show All" : "Preview Selected"}</span>
          </Button>
          <SendDialog
            selectedNewsletters={selectedNewsletters}
            newsletters={newsletters}
            onSendEmail={handleSendEmail}
          />
        </div>
        <div className="flex space-x-2">
          <Button
            className="bg-orange-500 hover:bg-orange-600"
            disabled={selectedNewsletters.length === 0}
            onClick={() =>
              navigate("/templates", {
                state: {
                  filteredNewslettersData: filteredNewslettersData,
                },
              })
            }
          >
            <SquareDashedMousePointer className="h-4 w-4 mr-2" /> Select
            Newsletters
          </Button>
        </div>
      </div>

      <NewsletterGrid
        newsletters={filteredNewsletters}
        selectedNewsletters={selectedNewsletters}
        toggleNewsletter={toggleNewsletter}
        isPreviewMode={previewMode}
      />
    </div>
  );
};

export default SendNewsletter;
