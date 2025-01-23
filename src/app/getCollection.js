"use client"; // This is a client component 👈🏽

import React, { useState, useEffect } from "react";
import Link from "next/link";

function Collection({data}) {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);

  return (
    <div>
      {data && data.length > 0 ? (
        <div className="collection-list">
          {data.map((item) => (
            <div key={item.id} className="collection-item">
              <Link href={`/details/${item.id}`}>
              <div className="collection-image">
                <img
                  src={item.basic_information.cover_image}
                  alt={item.basic_information.title}
                  style={{ cursor: "finger" }}
                />
              </div>
              <div className="collection-info">
              <h1><strong>{item.basic_information.title}</strong></h1>
              <h3>
                {item.basic_information.artists[0].name.replace(/\s\(\d+\)$/, '')}
              </h3>
              </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Collection;

