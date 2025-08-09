import { NextResponse } from "next/server";
import { getExperiences } from "@/app/utils/MarkdownUtils"; 

export async function GET() {
  const experiences = getExperiences();
  console.log("Fetched experiences:", experiences);
  return NextResponse.json(experiences);
}
