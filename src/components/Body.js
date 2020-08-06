import React from 'react'
import '../styles/Body.css';
import Header from './Header';
import SongRow from './SongRow';
import { useDataLayerValue } from '../DataLayer';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

function Body({ spotify }) {
    const [{ discover_weekly }, dispatch] = useDataLayerValue();

    const playPlaylist = (id) => {
        spotify
            .play({
                context_uri: `spotify:playlist:59Lh7YOPFg9VP8WMloTeCl`,
            })
            .then((res) => {
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
            });
    };


    const playSong = (id) => {
        spotify
            .play({
                uris: [`spotify:track:${id}`],
            })
            .then((res) => {
                spotify.getMyCurrentPlayingTrack((r) => {
                    dispatch({
                        type: 'SET_ITEM',
                        item: r.item,
                    });
                    dispatch({
                        type: 'SET_PLAYING',
                        playing: true,
                    });
                });
            });
    };



    return (
        <div className="body">
            {/* header */}
            <Header spotify={spotify} />

            <div class="body__info">
                <img src={discover_weekly?.images[0].url} alt="" />
                <div class="body__infoText">
                    <strong>PLAYLIST</strong>
                    <h2>Discover Weekly</h2>
                    <p>{discover_weekly?.description}</p>
                </div>
            </div>

            {/* list of songs */}
            <div class="body__songs">
                <div class="body__icons">
                    <PlayCircleFilledIcon className="body__shuffle" onClick={playPlaylist} />
                    <FavoriteIcon fontSize="large" />
                    <MoreHorizIcon />
                </div>

                {discover_weekly?.tracks.items.map((item) => (
                    <SongRow playSong={playSong} track={item.track} />
                ))}
            </div>
        </div>
    )
}

export default Body

// https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.scdn.co%2Fimage%2F11258b6c69204820d79575e0587f415735db2350&f=1&nofb=1
