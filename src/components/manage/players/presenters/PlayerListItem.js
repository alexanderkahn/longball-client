import React from 'react';
import {ListItem, ListItemIcon, ListItemText} from 'material-ui/List'
import {withStyles} from 'material-ui/styles';
import {Avatar} from "material-ui";
import {Link} from "react-router-dom";
import {personProp, rosterPositionProp} from "../../../../models/models";

const styles = theme => ({});

function PlayerListItem(props) {
    const rosterPosition = props.rosterPosition;
    const person = props.person;
    const playerDetailRoute = `/manage/players/${rosterPosition.id}`;
    return (
        <ListItem button component={Link} to={playerDetailRoute}>
            <ListItemIcon><Avatar>{person.attributes.last[0]}</Avatar></ListItemIcon>
            <ListItemText primary={person.attributes.first + " " + person.attributes.last}/>
        </ListItem>
    );
}

PlayerListItem.propTypes = {
    rosterPosition: rosterPositionProp.isRequired,
    person: personProp.isRequired,
};

export default withStyles(styles)(PlayerListItem);
