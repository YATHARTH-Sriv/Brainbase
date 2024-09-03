import dbconnect from "@/lib/db/dbconnect";
import SalesModel from "@/lib/db/model/sales.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
  try {
    await dbconnect()
    const {yoe,salesdesc}=await req.json()
    const res=await SalesModel.create({yoe:yoe,desc:salesdesc})
    console.log(res)
    return NextResponse.json({res},{status:200})
  } catch (error) {
    return NextResponse.json({message:"Internal Server Error"},{status:500})
  }
}