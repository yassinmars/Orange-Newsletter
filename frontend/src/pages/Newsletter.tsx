import { useState, useEffect} from "react";
import NewsletterList from "../components/NewsletterList";
import SendNewsletter from "@/components/SendNewsletter";
import { Mail, List } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";

function Newsletter() {

  return (
      <div>
        <Tabs
          defaultValue="manage"
          className="space-y-4"
          style={{ marginTop: "25px" }}
        >
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="manage" className="flex items-center gap-2">
              <List className="h-5 w-5" /> Manage Newsletters
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
      </div>
  );
}

export default Newsletter;
