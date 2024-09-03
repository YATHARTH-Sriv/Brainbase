"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { GridPattern } from '@/components/ui/gridbacl'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import axios from 'axios'
import { toast, useToast } from "../../components/ui/use-toast"
import { useRouter } from 'next/navigation'

function Page() {
  const [position, setPosition] = useState("")
  const [skill, setSkill] = useState("")
  const [skills, setSkills] = useState<string[]>([]) // State to store selected skills
  const [desc, setDesc] = useState("") // Corrected here to use camelCase
  const [yoe, setYoe] = useState("") // Corrected to use camelCase
  const [salesdesc, setsalesDesc] = useState("")
  const { toast } = useToast();
  const router=useRouter();

  const addSkill = (newSkill: string) => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill])
    }
  }

  const handleTech = async () => {
    try {
      console.log("Tech Recruit", position, skills, desc)
      const response = await axios.post('/api/recruit-tech', {
        position,
        skills,
        desc
      })
      console.log(response.data)
      if(response.status === 200) {
        toast({
          title: 'Well Got the info',
          description: "Let's find the best candidate for you",
          duration: 6000
        });
        const id=response.data.res._id
        router.push(`/candidate-emails/${id}`)
      }
      // Display a success message or update UI as needed
    } catch (error) {
      console.error("Failed to submit data", error)
      // Display an error message or update UI as needed
    }
  }

  const handlesale = async () => {
    try{
      console.log("salesrecruit", yoe, salesdesc)
      const response = await axios.post('/api/recruit-sale', {
        yoe,
        salesdesc
      })
      console.log(response.data)
      if(response.status === 200) {
        toast({
          title: 'Well Got the info',
          description: "Let's find the best candidate for you",
          duration: 6000
        });
        const id=response.data.res._id
        router.push(`/candidate-emails/${id}`)
      }
    } catch (error) {
      console.error("Failed to submit data", error)
    }
    
  }
  

  return (
    <div className="relative bg-black w-full h-screen flex flex-col items-center justify-center">
      {/* Background GridPattern */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <GridPattern />
      </div>

      {/* Center the Tabs component */}
      <div className="relative z-10 flex items-center justify-center">
        <Tabs defaultValue="tech" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tech">Tech</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
          </TabsList>
          <TabsContent value="tech">
            <Card>
              <CardHeader>
                <CardTitle>Tech Recruit</CardTitle>
                <CardDescription>
                  So you want a techie for your team, let me handle the interview
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">Role</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                        <DropdownMenuRadioItem value="Full Stack">Full Stack</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="Frontend">Frontend</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="Backend">Backend</DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="space-y-1">
                  {position && <p>So we are hiring for {position} Engineer</p>} 
                </div>
                {position && (
                  <div className="space-y-1">
                    <p>Want to know a bit more about the role</p>
                    <Select value={skill} onValueChange={(value) => {
                      setSkill(value);
                      addSkill(value);
                    }}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a skill" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Skills</SelectLabel>
                          <SelectItem value="JavaScript">JavaScript</SelectItem>
                          <SelectItem value="React">React</SelectItem>
                          <SelectItem value="Node.js">Node.js</SelectItem>
                          <SelectItem value="Python">Python</SelectItem>
                          <SelectItem value="Django">Django</SelectItem>
                          <SelectItem value="NextJS">NextJS</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {skills.length > 0 && (
                  <div className="space-y-1">
                    <p>Selected Skills:</p>
                    <ul className="list-disc list-inside">
                      {skills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {skill && (
                  <div className=' gap-2'>
                    <p>Do You Want To Provide some more info<br/> 
                        Go Ahead!</p>
                    <Textarea 
                      value={desc} 
                      onChange={(e) => setDesc(e.target.value)} 
                      className='mt-2' 
                      placeholder="Type your message here." 
                    />
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button onClick={handleTech}>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="sales">
            <Card>
              <CardHeader>
                <CardTitle>Sales Team Recruitment</CardTitle>
                <CardDescription>
                  So you want a Sales team to sell products 
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <p>Lets Hire a Good Sales Guy</p>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">YOE</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup value={yoe} onValueChange={setYoe}>
                        <DropdownMenuRadioItem value="0-1">0-1</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="2">2</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="3">3</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value=">3">More Than 3</DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {yoe && (
                  <div className=' gap-2'>
                    <p>So We Are Looking For {yoe} Experience</p>
                    <p>Define Me The Kind Of Person You Want<br/> 
                        Go Ahead!</p>
                    <Textarea 
                      className='mt-2' 
                      placeholder="Type your message here." 
                      value={salesdesc} 
                      onChange={(e) => setsalesDesc(e.target.value)} 
                    />
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button onClick={handlesale}>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Page
