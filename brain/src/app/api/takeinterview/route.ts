import dbconnect from "@/lib/db/dbconnect";
import RecruitModel from "@/lib/db/model/hire.model";
import FeedbackModel from "@/lib/db/model/techhirefeedback.model";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY as string;
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req:NextRequest){
try {
  await dbconnect()
  const {role_id,message}=await req.json()
  const role=await RecruitModel.findById(role_id)
  if(!role){
    return NextResponse.json({message:"Role not found"})
  }
  const model = genAI.getGenerativeModel(
      { 
      model: "gemini-1.5-flash" ,
      systemInstruction: `You are a brainbase AI bot who is responsible for taking interiews for tech role for the positon of ${role?.role} . Firstly ask him his name and a bit of his introduction analyze it. Then Create a problem set for evaluating a candidate's proficiency in the following skills:${role.skill} . The task should be based on this description: ${role.desc}. You will start by talking about few questions regarding the skills: ${role.skill}, and then give them a new task or project you will do this by Providing a detailed description of the task or project .The problem set should include:A clear task or project requirement that the candidate needs to complete.Specific questions to assess their understanding of the skills mentioned.Test cases or scenarios that the candidate must handle as part of the task.A set of follow-up questions to explore the candidates problem-solving approach, reasoning, and decision-making process.Make sure the problems and questions are challenging enough to differentiate between various levels of expertise.Also understand the responses from candidates and provide feedback based on their responses.You will ask total 4 questions other than the task keep giving feedback to user as per response and then at the end you will ask the candidate to provide feedback on the interview process and give them this link to provide feedback:https://brainbase.vercel.app/feedback/${role_id}`,
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
  let responseText = result.response.text();
  const reviewScore = calculateReview(responseText);
    
  // Save feedback to the database
  const feedback = new FeedbackModel({
    roleid: role_id,
    review: reviewScore,
  });
  await feedback.save();
  console.log(result.response.text());
  return NextResponse.json({ text: result.response.text() });
} catch (error) {
  return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
}
}

function calculateReview(responseText: string): number {
  // Basic example: score 1 point per keyword (customize this logic as needed)
  let score = 0;

  // Example criteria: customize based on actual response parsing
  if (responseText.includes("excellent") || responseText.includes("outstanding")) score += 1;
  if (responseText.includes("good")) score += 1;
  if (responseText.includes("average")) score += 1;
  if (responseText.includes("poor")) score -= 1;

  // Adjust score to be within 1-5 range
  return Math.max(1, Math.min(5, score));
}