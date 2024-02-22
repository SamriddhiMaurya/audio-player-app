// src/components/AudioPlayer.js
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";


const AudioPlayer = () => {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  useEffect(() => {
    // Load playlist and current track index from local storage on component mount
    const storedList = JSON.parse(localStorage.getItem("playlist")) || [];
    const CurrentIndex =
      parseInt(localStorage.getItem("currentTrackIndex")) || 0;

    setPlaylist(storedList);
    setCurrentTrackIndex(CurrentIndex);
  }, []);

  useEffect(() => {
    // Save playlist and current track index to local storage on change
    localStorage.setItem("playlist", JSON.stringify(playlist));
    localStorage.setItem("currentTrackIndex", currentTrackIndex.toString());
  }, [playlist, currentTrackIndex]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const newTrack = { id: uuidv4(), file };
    setPlaylist([...playlist, newTrack]);
  };

  const handlePlay = (index) => {
    setCurrentTrackIndex(index);
  };

  const handleEnded = () => {
    // Play the next track when the current one ends
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  return (
    <div>
      <input type="file" accept="audio/mp3" onChange={handleFileUpload} />
      <div className="PlayList">
        <h2>Playlist</h2>
        <ul>
          {playlist.map((track, index) => (
            <li key={track.id} onClick={() => handlePlay(index)}>
              {track.file.name}
            </li>
          ))}
        </ul>
      </div>
      {playlist.length > 0 && (
        <div>
          <h2>Now Playing</h2>
          <audio
            controls
            onEnded={handleEnded}
            src={URL.createObjectURL(playlist[currentTrackIndex].file)}
          />
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
