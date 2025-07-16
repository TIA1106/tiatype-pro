'use client';
import { useState } from 'react';

export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen pt-21 text-teal-500">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg mb-6 text-gray-500">
          Have questions, feedback, or ideas for TiaType? We'd love to hear from you.
        </p>

        {submitted ? (
          <div className="bg-green-100 p-4 rounded text-green-800">
            ✅ Thank you! Your message has been submitted.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              required
              placeholder="Your Name"
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="email"
              required
              placeholder="Your Email"
              className="w-full px-4 py-2 border rounded"
            />
            <textarea
              required
              placeholder="Your Message"
              rows={5}
              className="w-full px-4 py-2 border rounded"
            />
            <button
              type="submit"
              className="bg-teal-700 hover:bg-teal-800 text-white px-6 py-2 rounded"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
