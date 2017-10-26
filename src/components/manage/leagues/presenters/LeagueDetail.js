import React, {Component} from "react";
import PropTypes from 'prop-types';
import {TextField} from "material-ui";
import {withStyles} from 'material-ui/styles';
import LoadingProgressIndicator from "../../../shared/presenters/LoadingProgressIndicator";
import {currentViewProp, leagueProp} from "../../../../models/models";

const styles = theme => ({
    root: {
        padding: 10,
    },
    input: {
        display: 'block',
    }
});

//TODO: didMount & didUpdate should probably be split into a separate container so that the form is just a dumb form
class LeagueDetail extends Component {

    componentDidMount() {
        this.props.resetView();
    }

    componentDidUpdate() {
        const props = this.props;
        if (!props.currentView.isFetching && !props.league) {
            props.fetchLeagueDetail(props.selectedLeagueId);
        }
    }

    render() {
        const props = this.props;
        const league = props.league;
        const classes = props.classes;
        if (props.currentView.isFetching) {
            return (
                <LoadingProgressIndicator enabled={true}/>
            );
        } else if (!props.league) {
            return <div>I can't find a league with id: {props.selectedLeagueId}</div>
        } else {
            return (
                <form className={classes.root}>
                    <TextField className={classes.input}
                               disabled={true}
                               id="name"
                               label="Name"
                               value={league.attributes.name}/>
                </form>
            );
        }
    }
}

LeagueDetail.propTypes = {
    selectedLeagueId: PropTypes.string.isRequired,
    currentView: currentViewProp.isRequired,
    resetView: PropTypes.func.isRequired,
    fetchLeagueDetail: PropTypes.func.isRequired,
    league: leagueProp
};

export default withStyles(styles)(LeagueDetail);