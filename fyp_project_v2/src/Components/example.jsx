import React, { useRef, useEffect } from 'react';

function AudioPlayer() {
  const audioRef = useRef(null);

  useEffect(() => {
    let audioContext;

    // Function to play audio using Audio Context
    const playAudio = () => {
      audioContext = new AudioContext();
      const source = audioContext.createMediaElementSource(audioRef.current);
      source.connect(audioContext.destination);
      audioRef.current.play();
    }

    // Play audio if certain condition is met
    if (/* your condition */) {
      playAudio();
    }

    // Close Audio Context and stop audio after 2 minutes
    const timeoutId = setTimeout(() => {
      if (audioContext) {
        audioContext.close();
      }
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }, 120000); // 2 minutes in milliseconds

    // Clean up function to close Audio Context when component unmounts
    return () => {
      if (audioContext) {
        audioContext.close();
      }
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div>
      <audio ref={audioRef} src="your-audio-file.mp3" />
    </div>
  );
}
