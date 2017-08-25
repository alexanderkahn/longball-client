import React from 'react';
import PropTypes from 'prop-types';
import {ListItem, ListItemIcon, ListItemText} from 'material-ui/List'
import DraftsIcon from 'material-ui-icons/Drafts'
import {withStyles} from 'material-ui/styles';


const styles = theme => ({});

function TeamListItem(props) {
    const abbreviation = props.team.abbreviation;
    const location = props.team.location;
    const nickname = props.team.nickname;
    return (
        <ListItem button key={abbreviation}><ListItemIcon><DraftsIcon/></ListItemIcon><ListItemText primary={location + " " + nickname}/></ListItem>
    );
}

TeamListItem.propTypes = {
    team: PropTypes.shape({
        abbreviation: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        nickname: PropTypes.string.isRequired,
    }).isRequired

};

export default withStyles(styles)(TeamListItem);
