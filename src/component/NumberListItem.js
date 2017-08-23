import React from 'react';
import PropTypes from 'prop-types';
import {ListItem, ListItemIcon, ListItemText} from 'material-ui/List'
import DraftsIcon from 'material-ui-icons/Drafts'
import {withStyles} from 'material-ui/styles';


const styles = theme => ({});

function NumberListItem(props) {
    const number = props.number;
    return (
        <ListItem key={number.toString()}><ListItemIcon><DraftsIcon/></ListItemIcon><ListItemText primary={number}/></ListItem>
    );
}

NumberListItem.propTypes = {
    number: PropTypes.number.isRequired,
};

export default withStyles(styles)(NumberListItem);
