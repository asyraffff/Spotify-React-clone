import React, { useEffect } from 'react';
import './App.css';
import Login from './Login';
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import Player from './Player';
import { useDataLayerValue } from './DataLayer';

// constructor => creating an instance of spotifywebapi
const spotify = new SpotifyWebApi();

function App() {
  //const [token, setToken] = useState(null);

  // our data layer
  const [{ token }, dispatch] = useDataLayerValue();
  // {} => informatin from data layer like user
  // { dataLayer.user } === { user } => (destructuring)
  // dispatch is like a gun 🔫, use to shoot at the data layer, change/update it

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = '';
    let _token = hash.access_token;

    if (_token) {
      // connect to out token
      spotify.setAccessToken(_token);

      dispatch({
        type: 'SET_TOKEN',
        token: _token
      })

      dispatch({
        type: 'SET_SPOTIFY',
        spotify: spotify,
      })


      spotify.getMe().then((user) => {
        // console.log('😉', user);

        dispatch({
          type: 'SET_USER',
          user: user,
        });
      });

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: 'SET_PLAYLISTS',
          playlists: playlists
        })
      });

      spotify.getPlaylist('59Lh7YOPFg9VP8WMloTeCl').then((response) =>
        dispatch({
          type: 'SET_DISCOVER_WEEKLY',
          discover_weekly: response,
        })
      );

      spotify.getMyTopArtists().then((response) =>
        dispatch({
          type: 'SET_TOP_ARTISTS',
          top_aritists: response,
        })
      );
    }

    // console.log('I have a hash 👉', hash);
  }, [token, dispatch]);

  // console.log('😉', user);
  // console.log('🦄', token);



  return (
    <div className="app">
      {
        token ? (
          <Player spotify={spotify} />
        ) : (
            < Login />
          )
      }
    </div>
  );
}

export default App;
