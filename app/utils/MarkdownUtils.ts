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
  const experiences = getMDXData(path.join(process.cwd(), "content", "experience"));
  return sortExperiencesByDate(experiences);
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
  // Tách chuỗi theo dấu '-'
  const parts = dateStr.split("-").map((p) => p.trim().toUpperCase());

  // Tìm tất cả số năm trong chuỗi
  const yearMatches = dateStr.match(/\d{4}/g);
  if (yearMatches && yearMatches.length > 0) {
    // Lấy năm lớn nhất làm đại diện thời gian
    const maxYear = Math.max(...yearMatches.map((y) => parseInt(y)));

    // Nếu phần trước có tháng, ta lấy tháng đầu tiên, nếu không lấy tháng 1
    const firstPart = parts[0];
    let month = 1;

    if (monthMap[firstPart]) {
      month = monthMap[firstPart];
    }

    return new Date(maxYear, month - 1, 1);
  }

  // Trường hợp không có năm, trả về ngày hiện tại (giả định gần nhất)
  return new Date();
}

// Ví dụ dùng để sort mảng
function sortExperiencesByDate(experiences: ExperiencePost[]): ExperiencePost[] {
  return experiences.sort((a, b) => {
    const dateA = parseDateRangeForSorting(a.metadata.date);
    const dateB = parseDateRangeForSorting(b.metadata.date);

    // Muốn năm lớn hơn (mới hơn) đứng trước
    return dateB.getTime() - dateA.getTime();
  });

}

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