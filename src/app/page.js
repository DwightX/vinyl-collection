"use client"; // This is a client component 👈🏽

import Image from "next/image";
import Collection from "./getCollection";
import Header from "./header";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.discogs.com/users/howichill/collection/folders/0/releases?token=${process.env.NEXT_PUBLIC_REACT_APP_DISCOGS_TOKEN}&per_page=100&sort=title`
    )
      .then((response) => response.json())
      .then((json) => {
        console.log("Fetched data:", json); // Debugging
        setData(json.releases || []);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError(error);
      });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="collection-wrapper">
      <Header data={data}/>
      <Collection data={data} />
    </div>
  );
}
