// @flow

import React from "react";
import {NavLink, Route, Switch, withRouter} from "react-router-dom";
import {Paper, Button} from "material-ui";
import ManageTeamsContainer from "../../teams/containers/ManageTeamsContainer";
import TeamDetailContainer from "../../teams/containers/TeamDetailContainer";
import ManagePlayersContainer from "../../players/containers/ManagePlayersContainer";
import PlayerDetailContainer from "../../players/containers/PlayerDetailContainer";
import ManageLeaguesContainer from "../../leagues/containers/ManageLeaguesContainer";
import LeagueDetailContainer from "../../leagues/containers/LeagueDetailContainer";

const styles = {
    root: {
        width: '100%',
        maxWidth: 720,
        margin: '0 auto',
        marginBottom: 25,
    }
};

interface ManagementViewRouterProps {
    match: any //TODO: this should be an actual type
}

function ManagementViewRouter(props: ManagementViewRouterProps) {
    const match = props.match;
    return (
        <Paper style={styles.root}>
            <div color="primary">
                <NavLink to="/manage/leagues"><Button>Leagues</Button></NavLink>
                <NavLink to="/manage/teams"><Button>Teams</Button></NavLink>
                <NavLink to="/manage/players"><Button>Players</Button></NavLink>
            </div>
            <Switch>
                <Route exact path={`${match.url}/leagues`} component={ManageLeaguesContainer}/>
                <Route path={`${match.url}/leagues/:leagueId`} component={LeagueDetailContainer}/>

                <Route exact path={`${match.url}/teams`} component={ManageTeamsContainer}/>
                <Route path={`${match.url}/teams/:teamId`} component={TeamDetailContainer}/>

                <Route exact path={`${match.url}/players`} component={ManagePlayersContainer}/>
                <Route path={`${match.url}/players/:playerId`} component={PlayerDetailContainer}/>
            </Switch>
        </Paper>
    );
}
export default withRouter(ManagementViewRouter);