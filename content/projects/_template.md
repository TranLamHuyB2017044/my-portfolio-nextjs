---
# Display title shown on card and project page
title: "Project Name"

# Badge text on card — keep short e.g. "Mobile · Chat" or "AI · OCR"
type: "Mobile · Chat"

# Controls badge color: "" | "ai" | "web" | "mobile"
typeClass: ""

# Used by filter bar — array of: "mobile" | "ai" | "web"
category: ["mobile"]

# All tech tags shown on card
tags: ["Flutter", "Firebase", "BLoC"]

# Tags that render brighter (your primary skills for this project)
coreTags: ["Flutter", "BLoC"]

# One-sentence description shown on card (max ~100 chars)
desc: "Short punchy description of what the project does."

# Initials shown in thumbnail placeholder when no image available (max 2 words)
thumb: "PROJECT"

# 3 stat metrics shown in expanded panel
stats:
  - { n: "8+", l: "Screens built" }
  - { n: "1yr", l: "In production" }
  - { n: "3",   l: "Core features" }

# Bullet points in expanded panel — use <b> tags for key terms
highlights:
  - "Owned <b>fullscreen view & user profile</b> — shipped across all versions"
  - "Implemented <b>BLoC + RxDart</b> state architecture across entire app"
  - "Optimized widget rebuilds — smoother UX, fewer frame drops"

# Live demo URL — use "" if none. Triggers the "Landing page" button.
demoUrl: "https://your-demo.vercel.app"

# Video URL for live demo modal — use "" if none. Triggers the "View live demo" button.
videoUrl: "demo-video.mp4"

# GitHub repo URL — use "" if private
githubUrl: "https://github.com/yourusername/repo"

# Screenshot paths relative to /public — first image used as card thumbnail
images:
  - "/projects/slug/screen1.png"
  - "/projects/slug/screen2.png"
  - "/projects/slug/screen3.png"

# Sort order in grid (lower = first)
order: 1

# "featured" shows project first and larger — "normal" is standard card
featured: false
---

Long-form project description for SEO.
Explain what the project does, the problem it solves,
and key technical decisions made.
