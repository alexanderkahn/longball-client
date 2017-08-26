import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper'
import List, {ListSubheader} from 'material-ui/List';
import {Button} from "material-ui";
import AddIcon from 'material-ui-icons/Add'


const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        background: theme.palette.background.paper,
        margin: '0 auto',
    },
    button: {
        margin: 10,
    }
});

function ManagementList(props) {
    const classes = props.classes;
    const onClickAdd = props.onClickAdd;

    return (
        <div className={classes.root}>
            <Paper>
                <List subheader={<ListSubheader classes={classes.default}>{props.title}</ListSubheader>}>
                    {props.children}
                </List>
                <Button fab color="accent" aria-label="add" className={classes.button}
                        onClick={() => onClickAdd(getDemoTeam())}>
                    <AddIcon />
                </Button>
            </Paper>
        </div>
    );
}

ManagementList.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    onClickAdd: PropTypes.func.isRequired,
};
export default withStyles(styles)(ManagementList);

// ============================= this is demo BS and can go away soon =============================

let idCounter = 0;

function getDemoTeam() {
    idCounter += 1;
    return {
        id: idCounter.toString(),
        abbreviation: 'WSH',
        location: 'Washington',
        nickname: 'Nationals'
    };
}

// ================================================================================================

