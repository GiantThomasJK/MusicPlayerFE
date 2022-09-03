import React from 'react'
import styles from 'features/musicPlayer/pages/SongDetail/style.module.css'

function Details(props) {
    return (
        <div className={styles.c_player_details}>
            <div className={styles.details_img}>
                <img style={{width: 300}} src={props.song.thumbnail} alt="" />
            </div>
            <h3 className={styles.details_title}>{props.song.name}</h3>
            <h4 className={styles.details_artist}>{props.song.author}</h4>
        </div>
    )
}

export default Details
