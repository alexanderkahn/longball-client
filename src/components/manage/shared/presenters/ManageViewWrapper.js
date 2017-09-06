import React from "react";
import {NavLink, Route, Switch, withRouter} from "react-router-dom";
import {Paper, Button} from "material-ui";
import {withStyles} from 'material-ui/styles';
import ManageTeamsContainer from "../../teams/containers/ManageTeamsContainer";
import TeamDetailContainer from "../../teams/containers/TeamDetailContainer";
import ManagePlayersContainer from "../../players/containers/ManagePlayersContainer";
import PlayerDetailContainer from "../../players/containers/PlayerDetailContainer";

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 720,
        background: theme.palette.background.paper,
        margin: '0 auto',
        marginBottom: 25,
    },
    nav: {
        width: '100%',
        color: theme.accentColor
    },
});

function ManageViewWrapper(props) {
    const classes = props.classes;
    const match = props.match;
    return (
        <Paper className={classes.root}>
            <div color="primary">
                <NavLink to="/manage/teams"><Button>Teams</Button></NavLink>
                <NavLink to="/manage/players"><Button>Players</Button></NavLink>
            </div>
            <Switch>
                <Route exact path={`${match.url}/teams`} component={ManageTeamsContainer}/>
                <Route path={`${match.url}/teams/:teamId`} component={TeamDetailContainer}/>
                <Route exact path={`${match.url}/players`} component={ManagePlayersContainer}/>
                <Route path={`${match.url}/players/:playerId`} component={PlayerDetailContainer}/>
            </Switch>
        </Paper>
    );
}

ManageViewWrapper.propTypes = {};
export default withRouter(withStyles(styles)(ManageViewWrapper));