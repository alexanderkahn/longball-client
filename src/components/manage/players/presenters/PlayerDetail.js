import React, {Component} from "react";
import PropTypes from 'prop-types';
import {TextField} from "material-ui";
import {withStyles} from 'material-ui/styles';
import LoadingProgressIndicator from "../../../shared/presenters/LoadingProgressIndicator";

const styles = theme => ({
    root: {
        padding: 10,
    },
    input: {
        display: 'block',
    }
});

//TODO: didMount & didUpdate should probably be split into a separate container so that the form is just a dumb form
class PlayerDetail extends Component {

    componentDidMount() {
        this.props.resetView();
    }

    componentDidUpdate() {
        const props = this.props;
        if (!props.currentView.isFetching && !props.rosterPosition) {
            props.fetchPlayerDetail(props.selectedPlayerId);
        }
    }

    render() {
        const props = this.props;
        const rosterPosition = props.rosterPosition;
        const person = props.person;
        const classes = props.classes;
        if (props.currentView.isFetching) {
            return (
                <LoadingProgressIndicator enabled={true}/>
            );
        } else if (!rosterPosition) {
            return <div>I can't find a player with id: {props.selectedPlayerId}</div>
        } else {
            return (
                <form className={classes.root}>
                    <TextField className={classes.input}
                               disabled={true}
                               id="first"
                               label="First Name"
                               value={person.attributes.first}/>
                    <TextField className={classes.input}
                               disabled={true}
                               id="last"
                               label="Last Name"
                               value={person.attributes.last}/>
                </form>
            );
        }
    }

}

PlayerDetail.propTypes = {
    selectedPlayerId: PropTypes.string.isRequired,
    currentView: PropTypes.shape({
        isFetching: PropTypes.bool.isRequired,
        lastUpdated: PropTypes.number,
    }).isRequired,
    resetView: PropTypes.func.isRequired,
    fetchPlayerDetail: PropTypes.func.isRequired,
    rosterPosition: PropTypes.shape({
        id: PropTypes.string.isRequired,
    }),
    person: PropTypes.shape({
        attributes: PropTypes.shape({
            first: PropTypes.string.isRequired,
            last: PropTypes.string.isRequired,
        }).isRequired,
    }),
};

export default withStyles(styles)(PlayerDetail);