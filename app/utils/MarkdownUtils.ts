import fs from "fs";
import path from "path";
import matter from "gray-matter";

// ==================== Types ====================
export type Metadata = {
  title: string;
  date: string;
  tech: string[];
  thumbnail?: string; 
  link?: string;
  jobType?: string;
  company?: string;
  companyType?: string;
  stats?: { value: string; label: string }[];
  bullets?: string[];
};

export type ExperiencePost = {
  metadata: Metadata;
  slug: string;
  content: string;
};

export type ProjectMetadata = {
  title: string;
  type: string;
  typeClass: 'mobile' | 'ai' | 'web' | '';
  category: string[];
  tags: string[];
  coreTags: string[];
  desc: string;
  thumb: string;
  thumbnail?: string;
  stats: { n: string; l: string }[];
  highlights: string[];
  demoUrl: string;
  videoUrl?: string;
  githubUrl: string;
  images: string[];
  order: number;
  featured: boolean;
};

export type ProjectPost = {
  metadata: ProjectMetadata;
  slug: string;
  content: string;
};

// ==================== File Utilities ====================
function getMDXFiles(dir: string): string[] {
  return fs.readdirSync(dir).filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return ext === ".mdx" || ext === ".md";
  });
}

function readMDXFile<T>(filePath: string): T {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  return {
    metadata: {
      title: data.title as string,
      date: data.date as string,
      tech: Array.isArray(data.tech) ? (data.tech as string[]) : [],
      thumbnail: data.thumbnail as string | undefined,
      link: data.link as string | undefined,
      jobType: data.jobType as string | undefined,
      company: data.company as string | undefined,
      companyType: data.companyType as string | undefined,
      stats: data.stats as { value?: string; label?: string; n?: string; l?: string }[] | undefined,
      bullets: Array.isArray(data.bullets) ? (data.bullets as string[]) : [],
      type: data.type as string | undefined,
      typeClass: (data.typeClass as unknown as 'mobile' | 'ai' | 'web' | '') || '',
      category: Array.isArray(data.category) ? (data.category as string[]) : [],
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
      coreTags: Array.isArray(data.coreTags) ? (data.coreTags as string[]) : [],
      desc: data.desc as string | undefined,
      thumb: data.thumb as string | undefined,
      highlights: Array.isArray(data.highlights) ? (data.highlights as string[]) : [],
      demoUrl: data.demoUrl as string | undefined,
      videoUrl: data.videoUrl as string | undefined,
      githubUrl: data.githubUrl as string | undefined,
      images: Array.isArray(data.images) ? (data.images as string[]) : [],
      order: typeof data.order === 'number' ? data.order : 999,
      featured: !!data.featured,
    },
    slug: path.basename(filePath, path.extname(filePath)),
    content: content.trim(),
  } as unknown as T;
}

function getMDXData<T>(dir: string): T[] {
  return getMDXFiles(dir).map((file) =>
    readMDXFile<T>(path.join(dir, file))
  );
}

// ==================== Public API ====================
export function getExperiences(): ExperiencePost[] {
  const experiences = getMDXData<ExperiencePost>(
    path.join(process.cwd(), "content", "experience")
  );
  return sortExperiencesByDate(experiences);
}

export function getProjects(): ProjectPost[] {
  const projects = getMDXData<ProjectPost>(
    path.join(process.cwd(), "content", "projects")
  );
  return projects.sort((a, b) => a.metadata.order - b.metadata.order);
}

// ==================== Date Formatting ====================
const monthMap: Record<string, number> = {
  JAN: 1,
  FEB: 2,
  MAR: 3,
  APR: 4,
  MAY: 5,
  JUN: 6,
  JUL: 7,
  AUG: 8,
  SEP: 9,
  OCT: 10,
  NOV: 11,
  DEC: 12,
};

function parseDateRangeForSorting(dateStr: string): Date {
  const parts = dateStr.split("-").map((p) => p.trim().toUpperCase());
  const yearMatches = dateStr.match(/\d{4}/g);

  if (yearMatches && yearMatches.length > 0) {
    const maxYear = Math.max(...yearMatches.map((y) => parseInt(y)));
    const firstPart = parts[0];
    let month = 1;
    if (monthMap[firstPart]) {
      month = monthMap[firstPart];
    }
    return new Date(maxYear, month - 1, 1);
  }
  return new Date();
}

function sortExperiencesByDate(experiences: ExperiencePost[]): ExperiencePost[] {
  return experiences.sort((a, b) => {
    const dateA = parseDateRangeForSorting(a.metadata.date);
    const dateB = parseDateRangeForSorting(b.metadata.date);
    return dateB.getTime() - dateA.getTime();
  });
}

export function formatDate(date: string, includeRelative = false): string {
  const currentDate = new Date();

  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  const targetDate = new Date(date);

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  const daysAgo = currentDate.getDate() - targetDate.getDate();

  let relative = "";
  if (yearsAgo > 0) {
    relative = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    relative = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    relative = `${daysAgo}d ago`;
  } else {
    relative = "Today";
  }

  const fullDate = targetDate.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return includeRelative ? `${fullDate} (${relative})` : fullDate;
}
