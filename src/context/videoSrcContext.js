"use client"
import React, { createContext, useState } from 'react';
export const VideoSourceContext = createContext();
const VideoSrcContextProvider = ({ children }) => {
    const [getSrc, setGetSrc] = useState(null);
    return (
        <VideoSourceContext.Provider value={{ getSrc, setGetSrc }}>
            {children}
        </VideoSourceContext.Provider>
    )
}

export default VideoSrcContextProvider