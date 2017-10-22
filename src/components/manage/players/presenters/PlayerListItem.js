import React from 'react';
import PropTypes from 'prop-types';
import {ListItem, ListItemIcon, ListItemText} from 'material-ui/List'
import {withStyles} from 'material-ui/styles';
import {Avatar} from "material-ui";
import {Link} from "react-router-dom";


const styles = theme => ({});

function PlayerListItem(props) {
    const player = props.player;
    const personInfo = player.relationships.player.data.attributes;
    const playerDetailRoute = `/manage/players/${player.id}`;
    return (
        <Link to={playerDetailRoute} style={{textDecoration: 'none'}}>
            <ListItem button>
                <ListItemIcon><Avatar>{personInfo.last[0]}</Avatar></ListItemIcon>
                <ListItemText primary={personInfo.first + " " + personInfo.last}/>
            </ListItem>
        </Link>
    );
}

PlayerListItem.propTypes = {
    player: PropTypes.shape({
        id: PropTypes.string.isRequired,
        relationships: PropTypes.shape({
            player: PropTypes.shape({
                data: PropTypes.shape({
                    attributes: PropTypes.shape({
                        first: PropTypes.string.isRequired,
                        last: PropTypes.string.isRequired,
                    }).isRequired,
                }).isRequired,
            }).isRequired,
        }).isRequired,
    }).isRequired
};

export default withStyles(styles)(PlayerListItem);
