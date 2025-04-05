// Story.jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import './style.css';
import 'materialize-css/dist/css/materialize.min.css';

function Story() {
  return (
    <>
      <Helmet>
        <title>Story & Image Generator</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        />
        <script
          type="importmap"
          dangerouslySetInnerHTML={{
            __html: `{
              "imports": {
                "@google/generative-ai": "https://esm.run/@google/generative-ai"
              }
            }`,
          }}
        />
      </Helmet>

      <div className="logo-container">
        <img src="img.png" alt="Atria Code Club Logo" className="logo" />
      </div>

      <div className="container">
        <div className="header">
          <h1>ATRIA CODE CLUB</h1>
          <h3>AI MONO act</h3>
        </div>

        <div className="story-generator z-depth-5">
          <div className="input-group">
            <textarea
              id="story-input"
              placeholder="Enter your story prompt here..."
              rows="10"
            ></textarea>
            <button id="generate-story-btn" className="btn purple darken-4">
              Generate Monoact
            </button>
          </div>

          <div id="spinner" className="spinner-wrapper">
            <div className="spinner"></div>
          </div>

          <div id="generated-content" className="generated-content"></div>
        </div>

        <footer className="footer">
          <p>
            &copy; All rights reserved. Monoact by{' '}
            <span>
              <a href="https://github.com/UJESH2K">Ujesh</a> and{' '}
              <a href="https://github.com/Jrine0">Jitin</a>...
            </span>
          </p>
        </footer>
      </div>
    </>
  );
}

export default Story;
 