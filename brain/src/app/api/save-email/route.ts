import dbconnect from "@/lib/db/dbconnect";
import RecruitModel from "@/lib/db/model/hire.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    await dbconnect()
     const {role_id,emailInput}=await req.json()
     const role=await RecruitModel.findByIdAndUpdate(role_id,{email:emailInput})
     if (role) {
        return NextResponse.json({ message: "Email saved successfully" },{status:200});
     }
     

}