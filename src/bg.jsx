import React from 'react';
import narrate from './assets/narrate.jpg';
import './style.css';

function NarrateSection() {
  return (
    <div
      style={{
        backgroundImage: `url(${narrate})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '300px',
        width: '100%',
      }}
    >
    </div>
  );
}

export default NarrateSection;
