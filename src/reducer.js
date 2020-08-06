// This is what the element of data layer 
export const initialState = {
    user: null,
    playlists: [],
    playing: false,
    item: null,
    spotify: null,
    discover_weekly: null,
    top_artists: null,
    // remove after developing
    //token: 'BQBBSp2CLFehmbrGd7pEiH5X_l6PAChHPpV2vgV0VbJuc-8FsK--PDVncWayrebKOOanka4i3FlSmrVJc63Xcs5q3QQ_QMU8yoRc3HRscZabGrQPt3cmFY67u4hvUr2T7uUoSnLeEQeIXFgQzggYPgQF-04s_q29u1g3BJPP_cm8Nv0I'
}

// state => user/playlist/playing/item
// action => set the state to a specific action
const reducer = (state, action) => {
    console.log(action);

    // Action => type, [ payload ](<= user)

    switch (action.type) {
        case 'SET_USER':
            // here is user, throw them to the data layer
            // this is the new state
            return {
                ...state,
                user: action.user
            };
        case 'SET_PLAYING':
            return {
                ...state,
                playing: action.playing,
            };
        case 'SET_ITEM':
            return {
                ...state,
                item: action.item,
            };
        case 'SET_TOP_ARTISTS':
            return {
                ...state,
                top_artists: action.top_artists
            };
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token
            };
        case 'SET_SPOTIFY':
            return {
                ...state,
                spotify: action.spotify
            }
        case 'SET_PLAYLISTS':
            return {
                ...state,
                playlists: action.playlists
            };
        case 'SET_DISCOVER_WEEKLY':
            return {
                ...state,
                discover_weekly: action.discover_weekly
            }
        default:
            return state;
    }
}
// SET_USER job is just sit there, and listen to a user

export default reducer;