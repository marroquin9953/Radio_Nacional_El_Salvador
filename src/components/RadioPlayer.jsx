import { useEffect } from 'react';
import Hls from 'hls.js';

import './RadioPlayer.css';

const RadioPlayer = ({ name, img, url, isPlaying, togglePlay }) => {
    useEffect(() => {
        const videoElement = document.getElementById('videoTag');
        const hls = new Hls();

        const initializePlayer = () => {
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
        };

        initializePlayer();

        return () => {
            // Cleanup logic if needed
        };
    }, [url, isPlaying]);

    useEffect(() => {
        const videoElement = document.getElementById('videoTag');
        isPlaying ? videoElement.play() : videoElement.pause();
    }, [isPlaying]);

    return name ? (
        <div className="radio-player">
            <img className="song-img" src={img} alt={img} />
            <div className="song-name">{name}</div>
            <button className="btn-player" onClick={togglePlay}>
                <i className={isPlaying ? 'icon-pause' : 'icon-play'}></i>
            </button>
            <video id="videoTag" controls></video>
        </div>
    ) : null;
};

export default RadioPlayer;
