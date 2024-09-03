import dbconnect from "@/lib/db/dbconnect";
import RecruitModel from "@/lib/db/model/hire.model";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  try {
    await dbconnect()
    const { position, skills, desc }: { position: string; skills: string[]; desc: string } = await req.json();
    const datasaved=await RecruitModel.create({ role: position, skill: skills, desc });
    console.log(datasaved)
    console.log("Tech Recruit from backend", position, skills, desc);
    
    return NextResponse.json({ datasaved }, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
