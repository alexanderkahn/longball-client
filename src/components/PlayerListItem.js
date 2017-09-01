import React from 'react';
import PropTypes from 'prop-types';
import {ListItem, ListItemIcon, ListItemText} from 'material-ui/List'
import {withStyles} from 'material-ui/styles';
import {Avatar} from "material-ui";
import {Link} from "react-router-dom";


const styles = theme => ({});

function PlayerListItem(props) {
    const player = props.player;
    const playerDetailRoute = `/players/${props.player.id}`;
    return (
        <Link to={playerDetailRoute} style={{textDecoration: 'none'}}>
            <ListItem button>
                <ListItemIcon><Avatar>{player.last[0]}</Avatar></ListItemIcon>
                <ListItemText primary={player.first + " " + player.last}/>
            </ListItem>
        </Link>
    );
}

PlayerListItem.propTypes = {
    player: PropTypes.shape({
        id: PropTypes.string.isRequired,
        first: PropTypes.string.isRequired,
        last: PropTypes.string.isRequired,
    }).isRequired
};

export default withStyles(styles)(PlayerListItem);
