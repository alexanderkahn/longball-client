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
class LeagueDetail extends Component {

    componentDidMount() {
        const props = this.props;
        if (props.selectedLeagueId !== props.leagueDetailView.leagueId) {
            props.selectLeagueDetail(props.selectedLeagueId);
        }
    }

    componentDidUpdate() {
        const props = this.props;
        if (!props.leagueDetailView.isFetching && !props.league) {
            props.fetchLeagueDetail(props.leagueDetailView.leagueId);
        }
    }

    render() {
        const props = this.props;
        const league = props.league;
        const classes = props.classes;
        if (props.leagueDetailView.isFetching) {
            return (
                <LoadingProgressIndicator enabled={true}/>
            );
        } else if (!props.league) {
            return <div>I can't find a league with id: {props.leagueDetailView.leagueId}</div>
        } else {
            return (
                <form className={classes.root}>
                    <TextField className={classes.input}
                               disabled={true}
                               id="name"
                               label="Name"
                               value={league.name}/>
                </form>
            );
        }
    }
}

LeagueDetail.propTypes = {
    selectedLeagueId: PropTypes.string.isRequired,
    leagueDetailView: PropTypes.shape({
        leagueId: PropTypes.string.isRequired,
        isFetching: PropTypes.bool.isRequired,
    }).isRequired,
    selectLeagueDetail: PropTypes.func.isRequired,
    fetchLeagueDetail: PropTypes.func.isRequired,
    league: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    })
};

export default withStyles(styles)(LeagueDetail);