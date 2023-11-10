import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

import './RadioPlayer.css';

const RadioPlayer = ({ name, img, url, isPlaying, togglePlay }) => {
    const videoRef = useRef(null);
    const hlsRef = useRef(null);

    useEffect(() => {
        const videoElement = videoRef.current;
        const hls = new Hls();
        hlsRef.current = hls;

        if (!url) {
            return;
        }

        if (url.includes('.m3u8')) {
            hls.loadSource(url);
            hls.attachMedia(videoElement);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                if (!isPlaying) {
                    videoElement.play();
                }
            });
        } else {
            videoElement.src = url;
            videoElement.play();
        }

        return () => {
            // Cleanup Hls.js when component unmounts
            if (hlsRef.current) {
                hlsRef.current.destroy();
            }
        };
    }, [url, isPlaying]);

    useEffect(() => {
        const videoElement = videoRef.current;
        isPlaying ? videoElement.play() : videoElement.pause();
    }, [isPlaying]);

    return name ? (
        <div className="radio-player">
            <img className="song-img" src={img} alt={img} />
            <div className="song-name">{name}</div>
            <button className="btn-player" onClick={togglePlay}>
                <i className={isPlaying ? 'icon-pause' : 'icon-play'}></i>
            </button>
            <video ref={videoRef} id="videoTag" className="video-player" />
        </div>
    ) : null;
};

export default RadioPlayer;
