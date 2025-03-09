
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Send } from "lucide-react";
import { Newsletter } from "@/types/newsletter";

interface SendDialogProps {
  selectedNewsletters: number[];
  newsletters: Newsletter[];
  onSendEmail: () => void;
}

const SendDialog = ({ selectedNewsletters, newsletters, onSendEmail }: SendDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          className="bg-orange-500 hover:bg-orange-600"
          disabled={selectedNewsletters.length === 0}
        >
          <Send className="h-4 w-4 mr-2" /> Send Newsletters
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send Newsletters</DialogTitle>
          <DialogDescription>
            You are about to send {selectedNewsletters.length} newsletter{selectedNewsletters.length !== 1 ? 's' : ''}. 
            This will open your email client with the selected newsletters.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button 
            className="bg-orange-500 hover:bg-orange-600"
            onClick={onSendEmail}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SendDialog;
