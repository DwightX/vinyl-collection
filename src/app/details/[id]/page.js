"use client"; // Ensure this is a client-side component

import React, { useEffect, useState } from "react";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.min.css";

function DetailsPage({ params }) {
  const { id } = React.use(params); // Unwrap params here

  const [item, setItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // Modal state
  const [videoId, setVideoId] = useState(null); // Store the selected video ID

  useEffect(() => {
    if (id) {
      fetch(`https://api.discogs.com/releases/${id}`)
        .then((response) => response.json())
        .then((data) => setItem(data));
    }
  }, [id]);

  if (!item) return <p>Loading...</p>;

  const handleOpenModal = (id) => {
    setVideoId(id);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setVideoId(null);
  };

  return (
    <div className="details-page">
      <div className="cover-tracklist">
        <div className="album-info">
          <div className="cover">
            <img src={item.images[0].uri} alt={item.title} />
          </div>
          <div className="info">
            <h1>{item.title}</h1>
            <h2>{item.artists_sort.replace(/\s\(\d+\)$/, "")}</h2>
            <p className="genre-info">
              {item.genres.join(", ")} - {item.year}
            </p>
          </div>
        </div>
        <div className="tracklist">
          <ul>
            {item.tracklist.map((track, index) => (
              <li className="song" key={index}>
                {index + 1}.
                <div className="song-info">
                  <div className="title-wrapper">
                    <span className="song-title">{track.title}</span>
                  </div>
                  <div className="duration-wrapper">
                    <span className="song-duration">{track.duration}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="videos"> 
      <h1>Music Videos</h1>
        <div className="videos-grid">
            {item.videos.map((video, index) => {
            // Extract the video ID from the URL
            const videoId = new URL(video.uri).searchParams.get("v");

            return (
                <div key={index} className="video-wrapper">
                <button
                    onClick={() => handleOpenModal(videoId)}
                    className="video-button"
                >
                    <img
                    src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
                    alt={`Thumbnail for video ${index + 1}`}
                    className="video-thumbnail"
                    />
                </button>
                </div>
            );
            })}
        </div>
      </div>

      {/* ModalVideo Component */}
      <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId={videoId}
        onClose={handleCloseModal}
      />

      <div className="album-footer">
        <p>{item.released_formatted}</p>
        <p>{item.tracklist.length} Songs</p>
        <p>&reg; {item.year} {item.labels[0].name}</p>
      </div>
    </div>
  );
}

export default DetailsPage