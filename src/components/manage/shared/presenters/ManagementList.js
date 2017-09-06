import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import List, {ListSubheader} from 'material-ui/List';
import {Button} from "material-ui";
import AddIcon from 'material-ui-icons/Add'
import LoadingProgressIndicator from '../../../shared/presenters/LoadingProgressIndicator'


const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        background: theme.palette.background.paper,
        margin: '0 auto',
        marginBottom: 25,
    },
    button: {
        margin: 10,
        alignSelf: 'right',
    },
});

class ManagementList extends Component {

    componentDidMount() {
        const props = this.props;
        if (!props.lastFetched && !props.isFetching) {
            props.fetchListItems();
        }
    }


    render() {
        const props = this.props;
        const classes = props.classes;

        return (
            <div>
                <List subheader={<ListSubheader classes={classes.default}>{props.title}</ListSubheader>}>
                    {props.listItems}
                </List>
                <LoadingProgressIndicator enabled={props.isFetching}/>
                <Button fab color="accent" aria-label="add" className={classes.button} disabled>
                    <AddIcon/>
                </Button>
            </div>
        )
    }
}

ManagementList.propTypes = {
    title: PropTypes.string.isRequired,
    listItems: PropTypes.node.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastFetched: PropTypes.number,
    fetchListItems: PropTypes.func.isRequired,
};
export default withStyles(styles)(ManagementList);