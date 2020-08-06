import React, { useEffect } from 'react';
import '../styles/Footer.css';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import { Grid, Slider } from '@material-ui/core';
import { useDataLayerValue } from '../DataLayer';


function Footer({ spotify }) {
    const [{ item, playing }, dispatch] = useDataLayerValue();

    useEffect(() => {
        spotify.getMyCurrentPlaybackState().then((r) => {
            console.log(r);

            dispatch({
                type: "SET_PLAYING",
                playing: r.is_playing,
            });

            dispatch({
                type: "SET_ITEM",
                item: r.item,
            });
        });
    }, [spotify, dispatch]);

    const handlePlayPause = () => {
        if (playing) {
            spotify.pause();
            dispatch({
                type: "SET_PLAYING",
                playing: false,
            });
        } else {
            spotify.play();
            dispatch({
                type: "SET_PLAYING",
                playing: true,
            });
        }
    };

    const skipNext = () => {
        spotify.skipToNext();
        spotify.getMyCurrentPlayingTrack().then((r) => {
            dispatch({
                type: "SET_ITEM",
                item: r.item,
            });
            dispatch({
                type: "SET_PLAYING",
                playing: true,
            });
        });
    };

    const skipPrevious = () => {
        spotify.skipToPrevious();
        spotify.getMyCurrentPlayingTrack().then((r) => {
            dispatch({
                type: "SET_ITEM",
                item: r.item,
            });
            dispatch({
                type: "SET_PLAYING",
                playing: true,
            });
        });
    };

    return (
        <div className="footer">
            <div className="footer__left">
                {/* Album and song image */}
                <img
                    src={item?.album.images[0].url}
                    alt={item?.name}
                    className="footer__albumLogo"
                />
                {item ? (
                    <div className="footer__songInfo">
                        <h4>{item.name}</h4>
                        <p>{item.artists.map((artist) => artist.name).join(', ')}</p>
                    </div>
                ) : (
                        <div class="footer__songInfo">
                            <h4>No song is playing</h4>
                            <p>...</p>
                        </div>
                    )}
            </div>

            <div className="footer__center">
                {/* Player control */}
                <ShuffleIcon className="footer__green" />
                <SkipPreviousIcon className="footer__icon" onClick={skipNext} />
                {playing ? (
                    <PauseCircleOutlineIcon
                        className="footer__icon"
                        fontSize="large"
                        onClick={handlePlayPause}
                    />
                ) : (
                        <PlayCircleOutlineIcon
                            onClick={handlePlayPause}
                            fontSize="large"
                            className="footer__icon"
                        />
                    )}
                <SkipNextIcon className="footer__icon" onClick={skipPrevious} />
                <RepeatIcon className="footer__green" />
            </div>

            <div className="footer__right">
                {/* Volume control */}
                <Grid container spacing={2}>
                    <Grid item>
                        <PlaylistPlayIcon />
                    </Grid>
                    <Grid item>
                        <VolumeDownIcon />
                    </Grid>
                    <Grid item xs>
                        <Slider aria-labelledby="continuos-slider" />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Footer
