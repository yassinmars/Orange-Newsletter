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
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { getNewsletters, deleteNewsletter, updateNewsletter, createNewsletter } from "@/services/api";
import { Newsletter } from "@/types/newsletter";

const NewsletterList = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  // Modified to ensure newsletters are fetched regardless of auth state
  useEffect(() => {
    fetchNewsletters();
  }, []);

  const fetchNewsletters = async () => {
    try {
      setIsLoading(true);
      const data = await getNewsletters();
      console.log('Received newsletters:', data);
      // Ensure we're setting an array
      setNewsletters(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error in component:', error);
      toast({
        title: "Error",
        description: "Failed to fetch newsletters",
        variant: "destructive",
      });
      // Set empty array on error
      setNewsletters([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteNewsletter(id);
      setNewsletters(newsletters.filter((newsletter) => newsletter.id !== id));
      toast({
        title: "Newsletter deleted",
        description: "The newsletter has been successfully deleted.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete newsletter",
        variant: "destructive",
      });
    }
  };

  const handleStatusChange = async (id: number, newStatus: "draft" | "scheduled" | "sent") => {
    try {
      await updateNewsletter(id, { status: newStatus });
      setNewsletters(newsletters.map(newsletter => {
        if (newsletter.id === id) {
          return { ...newsletter, status: newStatus };
        }
        return newsletter;
      }));
      
      toast({
        title: "Status updated",
        description: `Newsletter status changed to ${newStatus}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const handleCreateNewsletter = async (newsletterData: {
    title: string;
    content: string;
    scheduledDate?: string;
  }) => {
    try {
      const newNewsletter = await createNewsletter({
        title: newsletterData.title,
        status: newsletterData.scheduledDate ? "scheduled" : "draft",
        scheduledDate: newsletterData.scheduledDate,
      });
      
      setNewsletters([...newsletters, newNewsletter]);
      toast({
        title: "Success",
        description: "Newsletter created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create newsletter",
        variant: "destructive",
      });
    }
  };

  const filteredNewsletters = newsletters.filter((newsletter) =>
    newsletter.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  if (isLoading) {
    return <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
    </div>;
  }

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
              onClose={() => document.querySelector<HTMLButtonElement>('[data-state="open"]')?.click()}
              onSubmit={handleCreateNewsletter}
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

      {newsletters.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500">No newsletters found. Create your first newsletter!</p>
        </div>
      ) : (
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
                  <TableCell className="font-medium">{newsletter.title}</TableCell>
                  <TableCell>
                    <Select
                      defaultValue={newsletter.status}
                      onValueChange={(value: "draft" | "scheduled" | "sent") => 
                        handleStatusChange(newsletter.id, value)
                      }
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue />
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
                  <TableCell>{new Date(newsletter.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {newsletter.scheduledDate ? new Date(newsletter.scheduledDate).toLocaleDateString() : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Edit className="h-4 w-4 text-orange-500" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <CreateNewsletter 
                            onClose={() => document.querySelector<HTMLButtonElement>('[data-state="open"]')?.click()}
                            onSubmit={handleCreateNewsletter}
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
                              Are you sure you want to delete this newsletter? This action cannot be undone.
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
      )}
    </div>
  );
};

export default NewsletterList;
