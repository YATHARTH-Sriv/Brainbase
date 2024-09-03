"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { GridPattern } from "@/components/ui/gridbacl"
import axios from 'axios'
import { useParams } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'

function ChatPage() {
    const [emailInput, setEmailInput] = useState(""); // Holds the user's input
    const [email, setEmail] = useState(""); // Holds the final email after submission
    const { roleid } = useParams();
    const role_id = roleid[0];
    const { toast } = useToast();
    const [message, setMessage] = useState(""); // Capture user input
    const [history, setHistory] = useState([ // Initial hardcoded messages
        { id: 1, role: 'user', text: 'Hello!' },
        { id: 2, role: 'model', text: 'Hi! How can I assist you today?' },
    ]);

    const handleClick = async () => {
        if (message.trim() === "") return; // Avoid sending empty messages

        // Add user's message to history
        const newUserMessage = { id: history.length + 1, role: 'user', text: message };
        setHistory((prevHistory) => [...prevHistory, newUserMessage]);

        try {
            const response = await axios.post('/api/takeinterview', { message, role_id });
            const modelResponse = response.data;

            // Assuming the response has a text property
            const newModelMessage = { id: history.length + 2, role: 'model', text: modelResponse.text };
            setHistory((prevHistory) => [...prevHistory, newModelMessage]);

        } catch (error) {
            console.error("Error sending message:", error);
        }

        // Clear the message input after sending
        setMessage("");
    }

    const handleEmailSubmit =  async () => {
        if (emailInput.trim() !== "") {
            setEmail(emailInput); // Set the final email
        }
        console.log(emailInput);
        const response=await axios.post('/api/save-email', { role_id, emailInput});
        if(response.status === 200) {
            toast({
              title: 'Your email is recorded',
              description: "All the best for your interview",
              duration: 6000
            });
        }
    }

    return (
        <div className="relative bg-black w-full h-screen flex flex-col items-center justify-center">
            {/* Background GridPattern */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <GridPattern />
            </div>

            {!email ? (
                <div className='relative z-10 mb-3 text-center'>
                    <h1 className="text-3xl font-bold text-white mb-4">Enter your email to get started</h1>
                    <input 
                        type="email" 
                        className="px-4 py-2 mb-2 border border-gray-300 rounded-lg w-80" 
                        value={emailInput} // Bind input to emailInput state
                        onChange={(e) => setEmailInput(e.target.value)} // Update emailInput on change
                        placeholder="Your email"
                    />
                    <Button onClick={handleEmailSubmit}>Submit</Button>
                </div>
            ) : (
                <>
                    <div className='relative z-10 mb-3 text-center'>
                        <h1 className="text-3xl font-bold text-white">Get your queries answered</h1>
                    </div>
                    <div className="relative z-10 w-full max-w-lg p-4 bg-white rounded-lg shadow-lg">
                        <div className="flex flex-col space-y-4 mb-4 max-h-80 overflow-y-auto">
                            {history.map((message) => (
                                <div
                                    key={message.id}
                                    className={`p-3 rounded-lg ${
                                        message.role === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 text-gray-900 self-start'
                                    }`}
                                >
                                    {message.text}
                                </div>
                            ))}
                        </div>
                        <div className="flex space-x-2">
                            <Textarea 
                                placeholder="Type your message here." 
                                className="flex-grow" 
                                value={message} 
                                onChange={(e) => setMessage(e.target.value)} 
                            />
                            <Button className="self-end" onClick={handleClick}>Send message</Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default ChatPage;
