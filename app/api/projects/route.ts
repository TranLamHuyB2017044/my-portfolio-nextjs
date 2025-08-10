import { NextResponse } from "next/server";
import { getProjects } from "@/app/utils/MarkdownUtils"; 

export async function GET() {
  const projects = getProjects();
  return NextResponse.json(projects);
}


