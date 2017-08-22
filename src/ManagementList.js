import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper'
import List from 'material-ui/List';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        background: theme.palette.background.paper,
        margin: '0 auto',
    },
});

function ManagementList(props) {
    const classes = props.classes;
    return (
        <div className={classes.root}>
            <Paper>
                <List>
                    {props.children}
                </List>
            </Paper>
        </div>
    );
}

ManagementList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ManagementList);