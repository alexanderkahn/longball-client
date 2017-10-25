import React from 'react';
import PropTypes from 'prop-types';
import {ListItem, ListItemIcon, ListItemText} from 'material-ui/List'
import {withStyles} from 'material-ui/styles';
import {Avatar} from "material-ui";
import {Link} from "react-router-dom";


const styles = theme => ({});

function PlayerListItem(props) {
    const rosterPosition = props.rosterPosition;
    const person = props.person;
    const playerDetailRoute = `/manage/players/${rosterPosition.id}`;
    return (
        <Link to={playerDetailRoute} style={{textDecoration: 'none'}}>
            <ListItem button>
                <ListItemIcon><Avatar>{person.attributes.last[0]}</Avatar></ListItemIcon>
                <ListItemText primary={person.attributes.first + " " + person.attributes.last}/>
            </ListItem>
        </Link>
    );
}

PlayerListItem.propTypes = {
    rosterPosition: PropTypes.shape({
        id: PropTypes.string.isRequired,
    }).isRequired,
    person: PropTypes.shape({
        attributes: PropTypes.shape({
            first: PropTypes.string.isRequired,
            last: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};

export default withStyles(styles)(PlayerListItem);
