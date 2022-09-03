import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faForward, faBackward } from '@fortawesome/free-solid-svg-icons'
import styles from 'features/musicPlayer/pages/SongDetail/style.module.css'

function Controls(props) {
    return (
        <div className={styles.c_player_controls}>
            <button className={styles.skip_btn} onClick={() => props.SkipSong(false)}>
                <FontAwesomeIcon icon={faBackward} />

            </button>
            <button className={styles.play_btn} onClick={() => props.setIsPlaying(!props.isPlaying)}>
                <FontAwesomeIcon icon={props.isPlaying ? faPause : faPlay} />
            </button>
            <button className={styles.skip_btn} onClick={() => props.SkipSong()}>
                <FontAwesomeIcon icon={faForward} />
            </button>
        </div>
    )
}

export default Controls
