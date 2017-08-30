import React from 'react';
import PropTypes from 'prop-types';
import {ListItem, ListItemIcon, ListItemText} from 'material-ui/List'
import {withStyles} from 'material-ui/styles';
import {Avatar} from "material-ui";


const styles = theme => ({});

function PlayerListItem(props) {
    const player = props.player;
    return (
        <ListItem button>
            <ListItemIcon><Avatar>{player.last[0]}</Avatar></ListItemIcon>
            <ListItemText primary={player.first + " " + player.last}/>
        </ListItem>
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
