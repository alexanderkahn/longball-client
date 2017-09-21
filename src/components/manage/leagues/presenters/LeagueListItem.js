import React from 'react';
import PropTypes from 'prop-types';
import {ListItem, ListItemIcon, ListItemText} from 'material-ui/List'
import {withStyles} from 'material-ui/styles';
import {Icon} from "material-ui";
import {Link} from "react-router-dom";


const styles = theme => ({});

function LeagueListItem(props) {
    const league = props.league;
    const leagueDetailRoute = `/manage/leagues/${props.league.id}`;
    return (
        <Link to={leagueDetailRoute} style={{ textDecoration: 'none' }}>
            < ListItem
                button>
                <ListItemIcon><Icon>{league.name[0]}</Icon></ListItemIcon>
                <ListItemText primary={league.name}/>
            </ListItem>
        </Link>
    );
}

LeagueListItem.propTypes = {
    league: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
};

export default withStyles(styles)(LeagueListItem);
