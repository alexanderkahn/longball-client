import * as React from 'react';
import { NavLink, Route, Switch, withRouter } from 'react-router-dom';
import { Paper, Button } from 'material-ui';
import ManageTeamsContainer from '../../teams/containers/ManageTeamsContainer';
import TeamDetailContainer from '../../teams/containers/TeamDetailContainer';
import ManagePlayersContainer from '../../players/containers/ManagePlayersContainer';
import PlayerDetailContainer from '../../players/containers/PlayerDetailContainer';
import ManageLeaguesContainer from '../../leagues/containers/ManageLeaguesContainer';
import LeagueDetailContainer from '../../leagues/containers/LeagueDetailContainer';
import { match } from 'react-router';
import { CSSProperties } from 'react';

const styles: CSSProperties = {
    root: {
        width: '100%',
        maxWidth: 720,
        margin: '0 auto',
        marginBottom: 25,
    }
};

export interface ManageItemRouteProps {
    itemId: string;
}

interface ManagementViewRouterProps {
    match: match<ManageItemRouteProps>;
}

function ManagementViewRouter(props: ManagementViewRouterProps) {
    const matchProp = props.match;
    return (
        <Paper style={styles.root}>
            <div color="primary">
                <NavLink to="/manage/leagues"><Button>Leagues</Button></NavLink>
                <NavLink to="/manage/teams"><Button>Teams</Button></NavLink>
                <NavLink to="/manage/players"><Button>Players</Button></NavLink>
            </div>
            <Switch>
                <Route exact={true} path={`${matchProp.url}/leagues`} component={ManageLeaguesContainer}/>
                <Route path={`${matchProp.url}/leagues/:itemId`} component={LeagueDetailContainer}/>

                <Route exact={true} path={`${matchProp.url}/teams`} component={ManageTeamsContainer}/>
                <Route path={`${matchProp.url}/teams/:itemId`} component={TeamDetailContainer}/>

                <Route exact={true} path={`${matchProp.url}/players`} component={ManagePlayersContainer}/>
                <Route path={`${matchProp.url}/players/:itemId`} component={PlayerDetailContainer}/>
            </Switch>
        </Paper>
    );
}
export default withRouter(ManagementViewRouter);