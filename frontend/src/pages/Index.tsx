import { useState } from "react";
import NewsletterList from "@/components/NewsletterList";
import SendNewsletter from "@/components/SendNewsletter";
import { UserRound, LogOut, Mail, List } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const { toast } = useToast();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const adminEmail = "admin@orange.com";
  const [activeTab, setActiveTab] = useState("manage");

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    window.location.reload();
    toast({
      title: "Success",
      description: "Logged out successfully",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/2000px-Orange_logo.svg.png"
                alt="Orange Logo"
                className="h-8"
              />
              <h1 className="text-xl font-bold text-gray-900">Newsletter Management</h1>
            </div>
            {isAuthenticated && (
              <div className="flex items-center space-x-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{adminEmail}</span>
                        <UserRound className="h-8 w-8 text-orange-500" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Logged in as Admin</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {isAuthenticated ? (
          <Tabs 
            defaultValue="manage" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="manage" className="flex items-center gap-2">
                <List className="h-4 w-4" /> Manage Newsletters
              </TabsTrigger>
              <TabsTrigger value="send" className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> Send Newsletters
              </TabsTrigger>
            </TabsList>
            <TabsContent value="manage">
              <NewsletterList />
            </TabsContent>
            <TabsContent value="send">
              <SendNewsletter />
            </TabsContent>
          </Tabs>
        ) : (
          <NewsletterList />
        )}
      </main>
    </div>
  );
};

export default Index;
