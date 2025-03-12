
import { useState, useEffect } from "react";
import { Mail, Eye } from "lucide-react";
import { getNewsletters } from "@/services/api";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Newsletter } from "@/types/newsletter";
import NewsletterGrid from "./newsletter/NewsletterGrid";
import SendDialog from "./newsletter/SendDialog";
import { generateEmailContent, openEmailClient } from "./newsletter/EmailContentGenerator";

const SendNewsletter = () => {
  const { toast } = useToast();
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [selectedNewsletters, setSelectedNewsletters] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    fetchNewsletters();
  }, []);

  const fetchNewsletters = async () => {
    try {
      setIsLoading(true);
      const data = await getNewsletters();
      // Ensure we're setting an array
      setNewsletters(Array.isArray(data) ? data : []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch newsletters",
        variant: "destructive",
      });
      setNewsletters([]);
    } finally {
      setIsLoading(false);
    }
  };

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
    ? newsletters.filter((newsletter) => selectedNewsletters.includes(newsletter.id))
    : newsletters;

  if (isLoading) {
    return <div className="text-center py-10">Loading newsletters...</div>;
  }

  return (
    <div className="space-y-4">
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
