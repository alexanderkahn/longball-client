import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper'
import List, {ListSubheader} from 'material-ui/List';
import {Button} from "material-ui";
import AddIcon from 'material-ui-icons/Add'
import {CircularProgress} from "material-ui/Progress";


const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        background: theme.palette.background.paper,
        margin: '0 auto',
    },
    button: {
        margin: 10,
        alignSelf: 'right',
    },
    loading: {
        display: 'block',
        width: '100%',
        margin: '0 auto',
        paddingTop: 10,
        paddingBottom: 10,
    }
});

function ManagementList(props) {
    const classes = props.classes;

    let progressIndicator = null;
    if (props.isFetching) {
        progressIndicator = <CircularProgress className={classes.loading}/>
    }

    return (
        <div className={classes.root}>
            <Paper>
                <List subheader={<ListSubheader classes={classes.default}>{props.title}</ListSubheader>}>
                    {props.listItems}
                </List>
                {progressIndicator}
                <Button fab color="accent" aria-label="add" className={classes.button} disabled>
                    <AddIcon/>
                </Button>
            </Paper>
        </div>
    );
}

ManagementList.propTypes = {
    title: PropTypes.string.isRequired,
    listItems: PropTypes.node.isRequired,
    isFetching: PropTypes.bool.isRequired,
};
export default withStyles(styles)(ManagementList);