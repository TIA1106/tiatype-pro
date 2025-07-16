'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';

export default function CreatePost() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [toneResult, setToneResult] = useState('');
  const [summaryResult, setSummaryResult] = useState('');
  const [keywordsResult, setKeywordsResult] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem('userId');
    if (!id) {
      router.push('/login');
    } else {
      setUserId(id);
    }
  }, [router]);

  const handleFixGrammar = async () => {
    if (!content) return;
    setLoading(true);

    try {
      const res = await fetch('/api/improve-grammar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: content }),
      });

      const data = await res.json();
      if (data.fixed) {
        setContent(data.fixed);
        toast.success('✅ Grammar improved!');
      } else {
        toast('⚠️ No changes returned.');
      }
    } catch (err) {
      console.error("Grammar API failed:", err);
      toast.error('❌ Failed to fix grammar.');
    }

    setLoading(false);
  };

  const handleAIAssist = async (type) => {
    if (!content) return toast('Please write some content first.');
    setLoading(true);

    try {
      const res = await fetch("/api/ai-assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: content, type }),
      });

      const data = await res.json();
      if (data.result) {
        if (type === "title") {
          setTitle(data.result);
        } else {
          setContent(data.result);
        }
      } else {
        toast('AI didn\'t return anything.');
      }
    } catch (err) {
      console.error("AI error:", err);
      toast.error("Something went wrong!");
    }

    setLoading(false);
  };

  const handleToneDetect = async () => {
    if (!content) return toast('Please write some content first.');
    setLoading(true);

    try {
      const res = await fetch("/api/ai-tone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: content }),
      });

      const data = await res.json();
      setToneResult(data.tone || "Unknown");
    } catch (err) {
      console.error("Tone detection failed:", err);
      setToneResult("❌ Error detecting tone.");
    }

    setLoading(false);
  };

  let recognition;
  let isListening = false;

  const handleVoiceToText = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast.error("Speech recognition is not supported in this browser.");
      return;
    }

    if (!recognition) {
      recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let interim = '';
        let finalText = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalText += transcript + ' ';
          } else {
            interim += transcript;
          }
        }

        setContent((prev) => prev + finalText);
      };

      recognition.onerror = (event) => {
        console.error("Speech Recognition Error:", event.error);
      };

      recognition.onend = () => {
        if (isListening) recognition.start();
      };
    }

    if (!isListening) {
      recognition.start();
      isListening = true;
      toast('🎙️ Voice recognition started. Speak now!');
    }
  };

  const handleStopDictation = () => {
    if (recognition && isListening) {
      recognition.stop();
      isListening = false;
      toast('🛑 Dictation stopped.');
    }
  };

  const handleSummarize = async () => {
    if (!content) return toast('Please write some content first.');
    setLoading(true);

    try {
      const res = await fetch("/api/ai-summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: content }),
      });

      const data = await res.json();
      setSummaryResult(data.summary || "❌ Failed to summarize content.");
    } catch (err) {
      console.error("Summary error:", err);
      setSummaryResult("❌ Error generating summary.");
    }

    setLoading(false);
  };

  const handleGenerateKeywords = async () => {
    if (!content) return toast('Please write some content first.');
    setLoading(true);

    try {
      const res = await fetch("/api/ai-keywords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: content }),
      });

      const data = await res.json();
      if (Array.isArray(data.keywords)) {
        setKeywordsResult(data.keywords.join(', '));
      } else {
        setKeywordsResult(data.keywords);
      }
    } catch (err) {
      console.error("Keyword error:", err);
      setKeywordsResult("❌ Error generating keywords.");
    }

    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const toastId = toast.loading('Publishing post...');
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          authorId: userId,
          status: 'published'
        }),
      });

      toast.dismiss(toastId);
      const data = await res.json();
      if (res.ok) {
        toast.success("🎉 Post Published!");
confetti({ particleCount: 100, spread: 70 });

        router.push('/dashboard');
      } else {
        toast.error(data.error || 'Something went wrong!');
      }
    } catch (err) {
      console.error("Submit failed:", err);
      toast.error('❌ Failed to publish post.');
    }
  };

  const handleSaveDraft = async () => {
    if (!title || !content) return toast('Please fill in the title and content first.');

    try {
      const res = await fetch('/api/save-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, authorId: userId }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("💾 Draft saved!");
      } else {
        toast.error(data.error || "Failed to save draft.");
      }
    } catch (err) {
      console.error("Save Draft failed:", err);
      toast.error("❌ Failed to save draft.");
    }
  };

  return (
    <div className="pt-13 min-h-screen px-4">
      <h1 className="text-2xl font-bold text-center mb-6 text-teal-800 dark:text-teal-300">
        ✍️ Write a New Blog
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-3 rounded "
          required
        />

        <textarea
          rows={10}
          placeholder="Write your blog post here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-3 rounded "
          required
        />
        <p className=" text-gray-400 mt-1">
          🧾 {content.trim().split(/\s+/).length} words • ⏱️ {Math.ceil(content.trim().split(/\s+/).length / 200)} min read
        </p>


        {summaryResult && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-300 rounded dark:bg-yellow-900 dark:border-yellow-600">
            <h3 className="font-semibold mb-1 text-yellow-800 dark:text-yellow-100">📝 Summary:</h3>
            <p className="text-sm text-gray-900 dark:text-white whitespace-pre-line">{summaryResult}</p>
          </div>

        )}

        {keywordsResult && (
          <div className="mt-4 p-3 bg-pink-50 border border-pink-300 rounded dark:bg-pink-900 dark:border-pink-600">
            <h3 className="font-semibold mb-1 text-pink-800 dark:text-pink-100">Keywords:</h3>
            <p className="text-sm text-gray-900 dark:text-white whitespace-pre-line">{keywordsResult}</p>
          </div>

        )}
        {toneResult && (
  <div className="mt-4 p-3 bg-indigo-50 border border-indigo-300 rounded dark:bg-indigo-900 dark:border-indigo-600">
    <h3 className="font-semibold mb-1 text-indigo-800 dark:text-indigo-100">🎭 Tone:</h3>
    <p className="text-sm text-gray-900 dark:text-white whitespace-pre-line">{toneResult}</p>
  </div>
)}




        <div className="flex flex-wrap gap-3 mt-2">
          <button
  type="button"
  onClick={handleVoiceToText}
  className="bg-purple-700 text-white px-3 py-2 rounded hover:bg-purple-800"
>
  🎙️ Start Dictation
</button>

<button
  type="button"
  onClick={handleStopDictation}
  className="bg-red-700 text-white px-3 py-2 rounded hover:bg-red-800"
>
  🛑 Stop Dictation
</button>


          <button
            type="button"
            onClick={handleSaveDraft}
            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded"
          >
            💾 Save as Draft
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
          >
            🚀 Publish Post
          </button>

          <button
            type="button"
            onClick={handleFixGrammar}
            disabled={loading}
            className={`bg-teal-700 text-white px-3 py-2 rounded hover:bg-teal-800 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Fixing Grammar...' : '✨ Fix Grammar'}
          </button>

          <button
            type="button"
            onClick={() => handleAIAssist('rephrase')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded"
          >
            🔁 Rephrase
          </button>

          <button
            type="button"
            onClick={() => handleAIAssist('friendly')}
            className="bg-violet-600 hover:bg-violet-700 text-white px-3 py-2 rounded"
          >
            😊 Friendly Tone
          </button>

          <button
            type="button"
            onClick={() => handleAIAssist('formal')}
            className="bg-purple-800 hover:bg-purple-900 text-white px-3 py-2 rounded"
          >
            🏛️ Formal Tone
          </button>

          <button
            type="button"
            onClick={() => handleAIAssist('title')}
            className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded"
          >
            💡 Suggest Title
          </button>

          <button
            type="button"
            onClick={() => handleAIAssist('next')}
            className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded"
          >
            ✍️ Continue Writing
          </button>

          <button
            type="button"
            onClick={handleSummarize}
            className="px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white dark:text-white rounded"
          >
            📝 Summarize
          </button>
          <button
  type="button"
  onClick={handleToneDetect}
  className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white dark:text-white rounded"
>
  🎭 Detect Tone
</button>


          <button
            type="button"
            onClick={handleGenerateKeywords}
            className="px-3 py-2 bg-pink-600 hover:bg-pink-700 text-white dark:text-white rounded"
          >
            🔑 Generate Keywords
          </button>



        </div>
      </form>
    </div>
  );
}
