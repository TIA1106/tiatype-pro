# ✍️ TiaType Pro

TiaType Pro is an advanced AI-powered blogging platform built during a 48-hour solo sprint. It's designed to make writing easier, smarter, and faster — with features like voice dictation, grammar fixes, tone detection, and post analytics.

📦 Built using **Next.js 14**, **MongoDB**, **Tailwind CSS**, and **OpenAI API**

---

## 🚀 Quick Overview

- 👤 User signup and profile setup (bio, profile image, etc.)
- 📝 Create, edit, publish, or save blog posts as drafts
- ✨ AI Assistant panel: grammar fixer, title suggestions, rephrasing, tone detection
- 🎤 **Voice-to-Text Dictation** for hands-free blogging!
- 📊 Analytics Dashboard: total posts, views, breakdown by status
- 🌙 Dark mode compatible & mobile responsive
- 💾 Draft autosave and manual save support
- Word count and extimated reading time needed assuming it takes 1 min to read 200 words

---

## 🎯 Features

### 🧠 AI Assistant

- ✨ Grammar improvement
- 🔁 Rephrasing
- 🧑‍⚖️ Tone adjustment (friendly, formal, etc.)
- 💡 Title suggestions
- ✍️ Continue Writing (auto-complete)
- 📝 Summarization
- 🔑 Keyword Extraction
- 🎭 Tone Detection
- 📋 Copy AI outputs
- 🎤 **Voice Dictation (Web Speech API)**

### 👤 User Profiles

- Takes `name`, `username`, `bio`, `profile picture URL` after signup
- Edits and saves from profile page
- Automatically appears in dashboard header

### 📊 Analytics Page

- Total post count
- Total views (view counter per post)
- Breakdown of published vs. draft posts

### 📦 Tech Stack

- `Next.js 14` (App Router)
- `MongoDB + Mongoose`
- `Tailwind CSS`
- `OpenAI API`
- `React Hot Toast`
- `Web Speech API` for voice

---

## 🛠 Setup & Local Development

### 1. Clone the repo

```bash
git clone https://github.com/your-username/tiatype-pro.git
cd tiatype-pro
npm install
npm run dev
