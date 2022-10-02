import React, {useState, useRef, useEffect} from 'react'
import Controls from './Controls';
import Details from './Details';
import styles from 'features/musicPlayer/pages/SongDetail/style.module.css'


function Player(props) {
    const audioEl = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (isPlaying) {
            audioEl.current.play();
        } else {
            audioEl.current.pause();
        }
    });

    const SkipSong = (forwards = true) => {
        if (forwards) {
            props.setCurrentSongIndex(() => {
                let temp = props.currentSongIndex;
                temp++;

                if (temp > props.selectedSong.length - 1) {
                    temp = 0;
                }

                return temp;
            });
        } else {
            props.setCurrentSongIndex(() => {
                let temp = props.currentSongIndex;
                temp--;

                if (temp < 0) {
                    temp = props.selectedSong.length - 1;
                }

                return temp;
            });
        }
    }

    return (
        <div className={styles.c_player}>
            <audio src={props.selectedSong.src} ref={audioEl}></audio>
            <Details song={props.selectedSong} />
            <Controls isPlaying={isPlaying} setIsPlaying={setIsPlaying} SkipSong={SkipSong} />
            <p>Next up: <span>{props.selectedSong.title} by {props.selectedSong.artist}</span></p>
        </div>
    )
}

export default Player;
