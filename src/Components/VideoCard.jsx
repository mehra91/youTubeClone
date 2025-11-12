import React, { useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";

const VideoCard = ({ searchQuery }) => {
  const [videos, setVideos] = useState([]);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = "https://www.googleapis.com/youtube/v3";

  useEffect(() => {
    if (!searchQuery) return; // don't call API if empty

    const getApiData = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/search?part=snippet&q=${encodeURIComponent(
            searchQuery
          )}&type=video&maxResults=12&key=${API_KEY}`
        );
        const data = await res.json();
        setVideos(data.items || []);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    getApiData();
  }, [searchQuery]);

  return (
    <div className="flex flex-wrap justify-evenly gap-4 p-4 bg-[#181818]">
      {videos.map((video) => (
        <div
          key={video.id.videoId}
          className="bg-[#212121] rounded-xl w-72 text-white hover:bg-[#2a2a2a] transition duration-300 cursor-pointer"
        >
          <iframe
            className="w-full rounded-b-xl"
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
    </div>
  );
};

export default VideoCard;
