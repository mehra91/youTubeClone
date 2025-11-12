import React, { useState } from "react";
import Header from "./Components/Header";
import VideoCard from "./Components/VideoCard";

const App = () => {
  const [text, setText] = useState("music"); // input field
  const [searchQuery, setSearchQuery] = useState("music"); // query to send to API

  const handleSearch = () => {
    setSearchQuery(text); // only triggers API call when button clicked
  };

  return (
    <div>
      <Header text={text} setText={setText} onSearch={handleSearch} />
      <VideoCard searchQuery={searchQuery} />
    </div>
  );
};

export default App;
