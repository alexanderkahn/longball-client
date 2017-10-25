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
class TeamDetail extends Component {

    componentDidMount() {
        this.props.resetView();
    }

    componentDidUpdate() {
        const props = this.props;
        if (!props.currentView.isFetching && !props.team) {
            props.fetchTeamDetail(props.selectedTeamId);
        }
    }

    render() {
        const props = this.props;
        const team = props.team;
        const classes = props.classes;
        if (props.currentView.isFetching) {
            return (
                <LoadingProgressIndicator enabled={true}/>
            );
        } else if (!props.team) {
            return <div>I can't find a team with id: {props.selectedTeamId}</div>
        } else {
            return (
                <form className={classes.root}>
                    <TextField className={classes.input}
                               disabled={true}
                               id="abbreviation"
                               label="Abbreviation"
                               value={team.attributes.abbreviation}/>
                    <TextField className={classes.input}
                               disabled={true}
                               id="location"
                               label="Location"
                               value={team.attributes.location}/>
                    <TextField className={classes.input}
                               disabled={true}
                               id="nickname"
                               label="Nickname"
                               value={team.attributes.nickname}/>
                </form>
            );
        }
    }
}

TeamDetail.propTypes = {
    selectedTeamId: PropTypes.string.isRequired,
    currentView: PropTypes.shape({
        isFetching: PropTypes.bool.isRequired,
        lastUpdated: PropTypes.number,
    }).isRequired,
    resetView: PropTypes.func.isRequired,
    fetchTeamDetail: PropTypes.func.isRequired,
    team: PropTypes.shape({
        id: PropTypes.string.isRequired,
        attributes: PropTypes.shape({
            abbreviation: PropTypes.string.isRequired,
            location: PropTypes.string.isRequired,
            nickname: PropTypes.string.isRequired,
        }).isRequired,
    })
};

export default withStyles(styles)(TeamDetail);