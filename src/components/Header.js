import React from 'react'
import '../styles/Header.css';
import SearchIcon from '@material-ui/icons/Search';
import { Avatar } from '@material-ui/core';
import { useDataLayerValue } from '../DataLayer';

function Header({ spotify }) {
    const [{ user }, dispatch] = useDataLayerValue();

    return (
        <div className="header">
            <div class="header__left">
                {/* SearchIcon + inputSearch */}
                <SearchIcon />
                <input
                    type="text"
                    placeholder="Search for Artists, Songs, or Podcasts"
                />
            </div>
            <div class="header__right">
                {/* username + avatar */}
                <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
                <h4>{user?.display_name}</h4>
            </div>
        </div>
    )
}

export default Header
