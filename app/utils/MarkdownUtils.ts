import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Metadata = {
  title: string;
  date: string;
  tech: string[];
};

export type ExperiencePost = {
  metadata: Metadata;
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

function readMDXFile(filePath: string): ExperiencePost {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  return {
    metadata: {
      title: data.title as string,
      date: data.date as string,
      tech: Array.isArray(data.tech) ? (data.tech as string[]) : [],
    },
    slug: path.basename(filePath, path.extname(filePath)),
    content: content.trim(),
  };
}

function getMDXData(dir: string): ExperiencePost[] {
  return getMDXFiles(dir).map((file) => readMDXFile(path.join(dir, file)));
}

// ==================== Public API ====================
export function getExperiences(): ExperiencePost[] {
  return getMDXData(path.join(process.cwd(), "content", "experience"));
}

// ==================== Date Formatting ====================
export function formatDate(date: string, includeRelative = false): string {
  const currentDate = new Date();

  // Ensure valid ISO datetime format for parsing
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
