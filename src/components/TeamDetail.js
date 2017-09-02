import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Paper, TextField} from "material-ui";
import {withStyles} from 'material-ui/styles';
import LoadingProgressIndicator from "./LoadingProgressIndicator";

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
        const props = this.props;
        if (props.selectedTeamId !== props.teamDetailView.teamId) {
            props.selectTeamDetail(props.selectedTeamId);
        }
    }

    componentDidUpdate() {
        const props = this.props;
        if (!props.teamDetailView.isFetching && !props.team) {
            props.fetchTeamDetail(props.teamDetailView.teamId);
        }
    }

    render() {
        const props = this.props;
        const team = props.team;
        const classes = props.classes;
        if (props.teamDetailView.isFetching) {
            return (
                <LoadingProgressIndicator enabled={true}/>
            );
        } else if (!props.team) {
            return <div>I can't find a team with id: {props.teamDetailView.teamId}</div>
        } else {
            return (
                <form className={classes.root}>
                    <TextField className={classes.input}
                               disabled={true}
                               id="abbreviation"
                               label="Abbreviation"
                               value={team.abbreviation}/>
                    <TextField className={classes.input}
                               disabled={true}
                               id="location"
                               label="Location"
                               value={team.location}/>
                    <TextField className={classes.input}
                               disabled={true}
                               id="nickname"
                               label="Nickname"
                               value={team.nickname}/>
                </form>
            );
        }
    }
}

TeamDetail.propTypes = {
    selectedTeamId: PropTypes.string.isRequired,
    teamDetailView: PropTypes.shape({
        teamId: PropTypes.string.isRequired,
        isFetching: PropTypes.bool.isRequired,
    }).isRequired,
    selectTeamDetail: PropTypes.func.isRequired,
    fetchTeamDetail: PropTypes.func.isRequired,
    team: PropTypes.shape({
        id: PropTypes.string.isRequired,
        abbreviation: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        nickname: PropTypes.string.isRequired
    })
};

export default withStyles(styles)(TeamDetail);