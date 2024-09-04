"use client";

import { toast, useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useRouter } from 'next/navigation';


function Page() {

  const { toast } = useToast()
  const [code, setcode] = useState("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")

  const router=useRouter()
  const sendEmail = async () => {
    try {
      const res = await axios.post('/api/email',{code,email,name});
      if (res) {
        toast({
          title: 'Email Sent to the user',
          description: 'With All Details',
          duration: 6000
        });
      }
      console.log(res);
    } catch (error) {
      console.log("Could not be sent");
      toast({
        title: 'Error',
        description: 'Email could not be sent',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className=' h-screen w-full bg-black'>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
      <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="name">Code</Label>
              <Input
              id="code"
              value={name}
              onChange={(e) => setcode(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="name">Email</Label>
              <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={sendEmail}>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
  </div>

  );
}

export default Page;


  