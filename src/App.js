import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import './style.css';
// import img from './assets/img.png';
// import narrate from './assets/narrate.jpg';

const GEMINI_API_KEY = process.env.VITE_GEMINI_API_KEY; // Use .env file for security

const starters = [
  "Once upon a time,",
  "In a faraway land,",
  "Deep in the heart of the forest,",
  "Long ago, in a forgotten kingdom,",
  "Beneath the endless night sky,",
];

function Story() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  const expandPrompt = (text) => {
    text = text.trim();
    if (text.length === 0) {
      setOutput(`<p class="error">Please enter a word or a phrase to generate a story.</p>`);
      return null;
    }

    if (text.split(" ").length <= 2) {
      const starter = starters[Math.floor(Math.random() * starters.length)];
      return `${starter} there was a place called ${text}, where something extraordinary was about to happen.`;
    }

    const validStarters = starters.map((s) => s.toLowerCase());
    if (validStarters.some((s) => text.toLowerCase().startsWith(s))) {
      return text;
    }

    return `Once upon a time, in a world where ${text}, a new adventure was about to unfold.`;
  };

  const handleGenerate = async () => {
    const prompt = expandPrompt(input);
    if (!prompt) return;

    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      let story = await response.text();

      story = story
        .replace(/[\*#_~`]/g, "")
        .replace(/\s(?=\w)/g, " ")
        .replace(/(?:\r\n|\r|\n)/g, "<br />");

      setOutput(`<p>${story}</p><hr />`);
    } catch (err) {
      console.error(err);
      setOutput('<p class="error">Sorry, I am having trouble generating the story.</p>');
    }
    setLoading(false);
  };

  return (
    <>
      {/* <div className="App">
      <img src={img} alt="Logo" />
    </div> */}
      <div className="container">
        <div className="input-group">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Enter your story prompt here..."
            rows="10"
            style={{
              borderColor: focused ? "purple" : "",
              height: focused ? "120px" : "",
            }}
          />
          <button onClick={handleGenerate} className="btn purple darken-4">
            Generate Monoact
          </button>
        </div>
  
        {loading && (
          <div className="spinner-wrapper">
            <div className="spinner"></div>
          </div>
        )}
  
        <div
          id="generated-content"
          dangerouslySetInnerHTML={{ __html: output }}
        ></div>
      </div>
    </>
  );  
}

export default Story;
