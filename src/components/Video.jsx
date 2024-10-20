import React, { useContext } from 'react';
import { VideoSourceContext } from "@/context/videoSrcContext"

const Video = ({ position , verticalSrc  , src , poster}) => {
    const { getSrc } = useContext(VideoSourceContext);
    return (
        <>
            {position == "Vertical" ? (
                <video key={verticalSrc} controls className={`w-full h-full bg-stone-200 rounded-xl`} preload={'auto'} type={"video/mp4"} poster={poster}>
                    <source src={verticalSrc} type="video/mp4" />
                </video>
            ) :position == "description" ? (
                <video key={src} controls className={`w-full h-full bg-stone-200 rounded-xl`} preload={'auto'} type={"video/mp4"}  poster={poster}>
                    <source src={src} type="video/mp4" />
                </video>
            ) : (
                <video key={getSrc} controls className={`w-full h-full bg-stone-200 rounded-xl`} preload={'auto'} type={"video/mp4"} poster={poster}>
                    <source src={getSrc ? getSrc : ''} type="video/mp4" />
                </video>
            )}
        </>
    );
};

export default Video;