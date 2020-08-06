// https://developer.spotify.com/documentation/web-playback-sdk/quick-start/

// 1) Click Login button
// 2) Redirect to Spotify login page
// 3) Redirect to hompage once authorized

export const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:3000/";
const clientId = "83e381a6440f4c19b847033061b8da2c";

const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
];

export const getTokenFromUrl = () => {
    return window.location.hash
        .substring(1)
        .split("&")
        .reduce((initial, item) => {
            var parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1]);

            return initial;
        }, {});
};

// http://localhost:3000/
// #access_token=BQCmYG4uvFNHYORIPZGFR34RgsDKFm_3yWeO-vnm_LBwVsU-wcsc_QM_-Ysk9uYQddb
// _iBXAYbrkCxRvBXmhWgyH4IATlYhclhSJNjqmzbrKmSlP0-APGXaRCVd57mR4owsjI4setTNcRQap_I_CvGLSPhAeTOYf-Wl96oPjLO6W5fsN
// &token_type=Bearer
// &expires_in=3600


export const accessUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
)}&response_type=token&show_dialog=true`;

// https://accounts.spotify.com/en/authorize?
// client_id=83e381a6440f4c19b847033061b8da2c
// &redirect_uri=http:%2F%2Flocalhost:3000%2F
// &scope=user-read-currently-playing
// %20user-read-recently-played%20user-read-playback-state
// %20user-top-read%20user-modify-playback-state
// &response_type=token&show_dialog=true
