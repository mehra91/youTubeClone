import React, { useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";

const VideoCard = ({ searchQuery }) => {
  const [videos, setVideos] = useState([]);
  const [nextToken, setNextToken] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = "https://www.googleapis.com/youtube/v3";

 
  const getApiData = async (pageToken = "", query = "") => {
    setLoading(true);
    try {
      
      const q = query || getRandomQuery(); // use random if empty
      const res = await fetch(
        `${BASE_URL}/search?part=snippet&q=${encodeURIComponent(
          q
        )}&type=video&maxResults=6&pageToken=${pageToken}&key=${API_KEY}`
      );
        // console.log("Request sent:", res.url);
      const data = await res.json();
      // console.log(data)

      setVideos((prev) =>
  pageToken ? [...prev, ...(data.items || [])] : (data.items || [])
);

      setNextToken(data.nextPageToken || "");
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
    setLoading(false);
  };

 
  const randomTopics = [
     "tech", "travel", "football", "comedy", 
    "gaming", "movies", "news", "food", "nature"
  ];

  const getRandomQuery = () =>
    randomTopics[Math.floor(Math.random() * randomTopics.length)];

 
  useEffect(() => {
    getApiData();
  }, []);

   
  useEffect(() => {
    if (searchQuery) getApiData("", searchQuery);
  }, [searchQuery]);

  
  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200;

      if (bottom && !loading && nextToken) {
        getApiData(nextToken, searchQuery);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [nextToken, loading, searchQuery]);

  return (
    <div className="flex flex-wrap justify-evenly gap-4 p-4 bg-[#181818]">
      {videos.map((video) => (
        <div
          key={video.id.videoId}
          className="bg-black py-3 px-2 rounded-xl w-72 text-white hover:bg-[#2a2a2a] transition duration-300 cursor-pointer"
        >
          <iframe
            className="w-full h-auto rounded-b-xl rounded-t-xl"
            height="200"
            src={`https://www.youtube.com/embed/${video.id.videoId}`}
            title={video.snippet.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>

          <div className="flex p-3 gap-3">
            <img
              src={video.snippet.thumbnails.default.url}
              alt="Channel Logo"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <h3 className="text-sm font-semibold leading-snug line-clamp-2">
                {video.snippet.title}
              </h3>
              <p className="text-sm text-gray-400 mt-1 flex items-center gap-1">
                {video.snippet.channelTitle}{" "}
                <FaCheckCircle className="text-gray-400 text-xs" />
              </p>
            </div>
            <BsThreeDotsVertical className="text-gray-300 hover:text-white text-xl" />
          </div>
        </div>
      ))}

      {loading && (
        <p className="text-white text-center w-full mt-4">
          Loading more videos...
        </p>
      )}
    </div>
  );
};

export default VideoCard;
