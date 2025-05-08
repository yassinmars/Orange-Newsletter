import { useState, useEffect } from "react";
import NewsletterList from "../components/NewsletterList";
import SendNewsletter from "@/components/SendNewsletter";
import { Mail, List, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchNews from "../components/SearchNews";

function Newsletter() {

  return (
    <div>
      <Tabs
        defaultValue="manage"
        className="space-y-6"
        style={{ marginTop: "25px" }}
      >
        <TabsList className="grid w-full max-w-xl grid-cols-3">
          <TabsTrigger value="manage" className="flex items-center gap-2">
            <List className="h-4 w-4" /> Manage News
          </TabsTrigger>
          <TabsTrigger value="send" className="flex items-center gap-2">
            <Mail className="h-4 w-4" /> Send Newsletters
          </TabsTrigger>

          <TabsTrigger value="search" className="flex items-center gap-2">
            <Search className="h-4 w-4" /> Search for news
          </TabsTrigger>
        </TabsList>

        <TabsContent value="manage">
          <NewsletterList />
        </TabsContent>

        <TabsContent value="send">
          <SendNewsletter />
        </TabsContent>

        <TabsContent value="search">
          <SearchNews />
        </TabsContent>

      </Tabs>
    </div>
  );
}

export default Newsletter;
