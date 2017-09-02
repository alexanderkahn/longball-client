import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Paper, TextField} from "material-ui";
import {withStyles} from 'material-ui/styles';
import LoadingProgressIndicator from "./LoadingProgressIndicator";

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        padding: 10,
        background: theme.palette.background.paper,
        margin: '0 auto',
        marginBottom: 25,
    },
    input: {
        display: 'block',
    }
});

//TODO: didMount & didUpdate should probably be split into a separate container so that the form is just a dumb form
class PlayerDetail extends Component {

    componentDidMount() {
        const props = this.props;
        if (props.selectedPlayerId !== props.playerDetailView.playerId) {
            props.selectPlayerDetail(props.selectedPlayerId);
        }
    }

    componentDidUpdate() {
        const props = this.props;
        if (!props.playerDetailView.isFetching && !props.player) {
            props.fetchPlayerDetail(props.playerDetailView.playerId);
        }
    }

    render() {
        const props = this.props;
        const classes = props.classes;
        return (
            <Paper className={classes.root}>
                <PlayerDetailEditForm player={props.player} playerDetailView={props.playerDetailView} classes={classes}/>
            </Paper>
        );
    }
}

function PlayerDetailEditForm(props) {
    const player = props.player;
    const classes = props.classes;
    if (props.playerDetailView.isFetching) {
        return (
            <LoadingProgressIndicator enabled={true}/>
        );
    } else if (!props.player) {
        return <div>I can't find a player with id: {props.playerDetailView.playerId}</div>
    } else {
        return (
            <form>
                <TextField className={classes.input}
                           disabled={true}
                           id="first"
                           label="First Name"
                           value={player.first}/>
                <TextField className={classes.input}
                           disabled={true}
                           id="last"
                           label="Last Name"
                           value={player.last}/>
            </form>
        );
    }
}

PlayerDetail.propTypes = {
    selectedPlayerId: PropTypes.string.isRequired,
    playerDetailView: PropTypes.shape({
        playerId: PropTypes.string.isRequired,
        isFetching: PropTypes.bool.isRequired,
    }).isRequired,
    selectPlayerDetail: PropTypes.func.isRequired,
    fetchPlayerDetail: PropTypes.func.isRequired,
    player: PropTypes.shape({
       id: PropTypes.string.isRequired,
       first: PropTypes.string.isRequired,
       last: PropTypes.string.isRequired,
    }),
};

export default withStyles(styles)(PlayerDetail);