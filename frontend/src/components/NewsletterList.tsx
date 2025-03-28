import { useState, useEffect } from "react";
import { Mail, Edit, Trash, Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import CreateNewsletter from "./CreateNewsletter";
import LoginForm from "./LoginForm";
import UpdateNewsLetter from "./UpdateNewsletter";
import axios from "axios";

const NewsletterList = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [newsletters, setNewsletters] = useState([]);
  const [selectedNewsletterId, setSelectedNewsletterId] = useState();

  useEffect(() => {
    // Fetch newsletters data using axios
    axios
      .get("http://localhost:6005/api/newsletter")
      .then((res) => {
        setNewsletters(res.data.Newsletter); // Set the newsletters state with the extracted data
      })
      .catch((err) => console.error("Error fetching newsletters:", err));
  }, []);

  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:6005/api/deleteNewsletter/${id}`)
      .then(() => {
        console.log("Newsletter deleted successfully");
        setNewsletters(
          newsletters.filter((newsletter) => newsletter.id !== id)
        );
        toast({ title: "Newsletter deleted successfully", status: "success" });
      })
      .catch((err) => {
        console.error("Error deleting newsletter:", err);
        toast({ title: "Failed to delete newsletter", status: "error" });
      });
  };


  const filteredNewsletters = newsletters.filter((newsletter) =>
    newsletter.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );  

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Mail className="h-5 w-5 text-orange-500" />
          <h2 className="text-2xl font-bold text-gray-900">Newsletters</h2>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="h-4 w-4 mr-2" /> New Newsletter
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <CreateNewsletter
              onClose={() =>
                document
                  .querySelector<HTMLButtonElement>('[data-state="open"]')
                  ?.click()
              }
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search newsletters..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Scheduled</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredNewsletters.map((newsletter) => (
              <TableRow key={newsletter.id}>
                <TableCell className="font-medium">
                  {newsletter.Title}
                </TableCell>
                <TableCell>
                  <Select
                    // You can manage the status of the newsletter with a handler
                    defaultValue={newsletter.Status}
                    onValueChange={(value: "draft" | "scheduled" | "sent") => {
                      // Update status logic here (optional)
                    }}
                  >
                    <SelectTrigger className="w-[130px]">
                      <SelectValue>{newsletter.Status}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-50 text-orange-800">
                          draft
                        </span>
                      </SelectItem>
                      <SelectItem value="scheduled">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800">
                          scheduled
                        </span>
                      </SelectItem>
                      <SelectItem value="sent">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-200 text-orange-800">
                          sent
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>{newsletter.Description}</TableCell>
                <TableCell>{newsletter.Links}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="icon" onClick={() => {setSelectedNewsletterId(newsletter.id)}}>
                          <Edit className="h-4 w-4 text-orange-500" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <UpdateNewsLetter
                          id={selectedNewsletterId}
                          onClose={() =>
                            document
                              .querySelector<HTMLButtonElement>(
                                '[data-state="open"]'
                              )
                              ?.click()
                          }
                        />
                      </DialogContent>
                    </Dialog>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Trash className="h-4 w-4 text-red-500" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Newsletter</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this newsletter?
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(newsletter.id)}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default NewsletterList;
