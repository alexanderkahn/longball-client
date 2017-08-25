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
    const demoTeam = {
        abbreviation: 'WSH',
        location: 'Washington',
        nickname: 'Nationals'
    };

    return (
        <div className={classes.root}>
            <Paper>
                <List subheader={<ListSubheader classes={classes.default}>{props.title}</ListSubheader>}>
                    {props.children}
                    <Button fab color="accent" aria-label="add" className={classes.button} onClick={() => onClickAdd(demoTeam)}>
                        <AddIcon />
                    </Button>
                </List>
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