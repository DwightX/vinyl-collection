"use client"; // This is a client component 👈🏽

import React, { useState, useEffect } from "react";

function Header({data}) {
    return(
        <div className="collection-header">
            <h1 className="header-title" style={{color:'#FA2D48'}}><strong>Dwights Vinyl Collection</strong></h1>
            <p>Albums: {data.length}</p>
        </div>
    )
}

export default Header