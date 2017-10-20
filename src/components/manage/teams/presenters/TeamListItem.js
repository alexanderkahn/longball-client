import React from 'react';
import PropTypes from 'prop-types';
import {ListItem, ListItemIcon, ListItemText} from 'material-ui/List'
import {withStyles} from 'material-ui/styles';
import {Icon} from "material-ui";
import {Link} from "react-router-dom";


const styles = theme => ({});

function TeamListItem(props) {
    const team = props.team;
    const teamDetailRoute = `/manage/teams/${props.team.id}`;
    return (
        <Link to={teamDetailRoute} style={{ textDecoration: 'none' }}>
            < ListItem
                button>
                <ListItemIcon><Icon>{team.attributes.abbreviation}</Icon></ListItemIcon>
                <ListItemText primary={team.attributes.location + " " + team.attributes.nickname}/>
            </ListItem>
        </Link>
    );
}

TeamListItem.propTypes = {
    team: PropTypes.shape({
        id: PropTypes.string.isRequired,
        attributes: PropTypes.shape({
            abbreviation: PropTypes.string.isRequired,
            location: PropTypes.string.isRequired,
            nickname: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};

export default withStyles(styles)(TeamListItem);
