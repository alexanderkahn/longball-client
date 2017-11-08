import React, {Component} from 'react';
import PropTypes from 'prop-types';
import List, {ListSubheader} from 'material-ui/List';
import {Button} from "material-ui";
import AddIcon from 'material-ui-icons/Add'
import LoadingProgressIndicator from '../../../shared/presenters/LoadingProgressIndicator'


const styles = {
    button: {
        margin: 10,
        alignSelf: 'right',
    },
};

class ManagementList extends Component {

    componentDidMount() {
        const props = this.props;
        if (!props.lastFetched && !props.isFetching) {
            props.fetchListItems();
        }
    }


    render() {
        const props = this.props;

        return (
            <div>
                <List subheader={<ListSubheader style={styles.default}>{props.title}</ListSubheader>}>
                    {props.listItems}
                </List>
                <LoadingProgressIndicator enabled={props.isFetching}/>
                <Button fab color="accent" aria-label="add" style={styles.button} disabled>
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
export default ManagementList;