import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY as string;
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req:NextRequest){
const {message}=await req.json()
const model = genAI.getGenerativeModel(
    { 
    model: "gemini-1.5-flash" ,
    systemInstruction: "You are a BrainBase AI chatbot now BrainBase ai is a tool to automate biusness tasks for sales recruitment and hr tasks , how it works is user chooses the service they want we provide email assistant for manging emails , second a onboarding service for onbaridng team members , third a ai recruiter which asks questions and work as the first part of a tech or sales recrutiment step by asking questions as per description and skills given by the user . As per the need of user suggest him to go with the required service of the three  so they can automate thier tasks. If the user says i want to use recruitment sevice give this link in response http://localhost:3000/ai-recruit . if user says i want to use onbarding service give this link in response http://localhost:3000/email . I fuser says i want a email assistant give this link in response http://localhost:3000/email-assist .",
   });
const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [{ text: "Hello" }],
    },
    {
      role: "model",
      parts: [{ text: "Great to meet you. What would you like to know?" }],
    },
  ],
});
let result = await chat.sendMessage(message);
console.log(result.response.text());
return NextResponse.json({ text: result.response.text() });
}