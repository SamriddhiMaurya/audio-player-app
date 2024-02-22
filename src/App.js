import React from 'react'
import AudioPlayer from './Components/AudioPlayer';
import Header from './Components/Header';
import Footer from './Components/Footer';

function App() {
  return (
    <div>
      <Header />
      <h2>Upload a song to play from for system:</h2>
      <AudioPlayer />
      <Footer/>
    </div>
  );
}

export default App;