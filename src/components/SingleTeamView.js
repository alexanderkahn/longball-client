import React from "react";
import PropTypes from 'prop-types';
import {Paper, TextField} from "material-ui";
import {withStyles} from 'material-ui/styles';

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


function SingleTeamView(props) {
    const team = props.team;
    const classes = props.classes;
    return (
        <Paper className={classes.root}>
            <form>
                <TextField className={classes.input}
                           disabled={true}
                           id="abbreviation"
                           label="Abbreviation"
                           value={team.abbreviation}/>
                <TextField className={classes.input}
                           disabled={true}
                           id="location"
                           label="Location"
                           value={team.location} />
                <TextField className={classes.input}
                           disabled={true}
                           id="nickname"
                           label="Nickname"
                           value={team.nickname} />
            </form>
        </Paper>
    );
}

SingleTeamView.propTypes = {
    team: PropTypes.shape({
        id: PropTypes.string.isRequired,
        abbreviation: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        nickname: PropTypes.string.isRequired
    }).isRequired,
};

export default withStyles(styles)(SingleTeamView);