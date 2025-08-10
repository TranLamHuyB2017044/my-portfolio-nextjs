import { NextResponse } from "next/server";
import { getExperiences } from "@/app/utils/MarkdownUtils"; 

export async function GET() {
  const experiences = getExperiences();
  return NextResponse.json(experiences);
}


