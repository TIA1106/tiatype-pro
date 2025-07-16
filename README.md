# ✨ TiaType Pro — AI-Powered Blogging Platform

**TiaType Pro** is a modern, AI-enhanced blogging platform crafted with 💻 **Next.js 14**, 🧠 **OpenAI GPT-4**, and 🗃️ **MongoDB**.

It allows users to write, summarize, analyze, and improve blog posts — with live voice dictation, grammar fixes, tone suggestions, and complete profile/analytics features.

> 🏁 Built solo in **48 hours** as part of a personal development sprint by [Tia Sukhnanni]

---

## 🧠 Features at a Glance

- ✍️ **Blog Editor** – Create, save as draft, or publish posts
- 🎤 **Voice Dictation** – Use speech-to-text for writing
- 🤖 **AI Assistant Panel**:
  - Fix Grammar ✨
  - Rephrase 🔁
  - Friendly / Formal Tone 🎭
  - Suggest Title 💡
  - Summarize 📝
  - Detect Tone 🔎
  - Continue Writing ✍️
  - Generate Keywords 🔑
- 💾 **Save as Draft** + 🚀 **Publish**
- 📊 **Analytics** – Track total drafts, posts, and views
- 👤 **Profile Setup** – Name, Username, Bio, and Profile Image
- 🌙 **Dark Mode Friendly UI**
- 🔐 **Auth** with user-based post tracking
- ⏱️ **Word Count** + **Read Time Estimation**

---

## 🛠️ Tech Stack

- ⚛️ **Next.js 14 (App Router)**
- 🧠 **OpenAI GPT-4 API**
- 🗃️ **MongoDB + Mongoose**
- 🎨 **TailwindCSS**
- 🧼 **React Hot Toast**
- 🗣️ **Web Speech API (Voice Dictation)**

---

### 1. Clone the repo

```bash
git clone https://github.com/your-username/tiatype-pro.git
cd tiatype-pro
npm install

## 2. Create .env.local in root and Add Your Secrets
MONGODB_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_key
👉 Both are private and required for full functionality.


npm run dev

⚠️ Important Notes
Your .env.local is ignored by Git (see .gitignore)

MONGODB_URI and OPENAI_API_KEY are required to save posts and use AI features

If cloning, use your own keys to make it work locally

👩‍💻 Author
Made with ❤️ by Tia Sukhnanni
BTech Student | Full-Stack & AI Enthusiast | Built this solo in a 48-hour sprint 🚀
