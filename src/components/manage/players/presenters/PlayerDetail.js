import React, {Component} from "react";
import PropTypes from 'prop-types';
import {TextField} from "material-ui";
import {withStyles} from 'material-ui/styles';
import LoadingProgressIndicator from "../../../shared/presenters/LoadingProgressIndicator";
import {currentViewProp, personProp, rosterPositionProp} from "../../../../models/models";

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
    currentView: currentViewProp.isRequired,
    selectedPlayerId: PropTypes.string.isRequired,
    rosterPosition: rosterPositionProp,
    person: personProp,
    resetView: PropTypes.func.isRequired,
    fetchPlayerDetail: PropTypes.func.isRequired,
};

export default withStyles(styles)(PlayerDetail);