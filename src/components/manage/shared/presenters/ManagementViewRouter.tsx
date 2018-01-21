import * as React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Paper, Button } from 'material-ui';
import ManageTeamsContainer from '../../teams/containers/ManageTeamsContainer';
import TeamDetailContainer from '../../teams/containers/TeamDetailContainer';
import ManagePlayersContainer from '../../players/containers/ManagePlayersContainer';
import PlayerDetailContainer from '../../players/containers/PlayerDetailContainer';
import ManageLeaguesContainer from '../../leagues/containers/ManageLeaguesContainer';
import LeagueDetailContainer from '../../leagues/containers/LeagueDetailContainer';
import { match } from 'react-router';
import { CSSProperties } from 'react';
import { History } from 'history';

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
    history: History;
}

function ManagementViewRouter(props: ManagementViewRouterProps) {
    const { match: matchProp, history } = props;
    return (
        <Paper style={styles.root}>
            <div color="primary">
                <Button onClick={() => history.push('/manage/leagues')}>Leagues</Button>
                <Button onClick={() => history.push('/manage/teams')}>Teams</Button>
                <Button onClick={() => history.push('/manage/players')}>Players</Button>
            </div>
            <Switch>
                <Route exact={true} path={`${matchProp.url}/leagues`} component={ManageLeaguesContainer}/>
                <Route path={`${matchProp.url}/leagues/:itemId`} component={LeagueDetailContainer}/>

                <Route exact={true} path={`${matchProp.url}/teams`} component={ManageTeamsContainer}/>
                <Route path={`${matchProp.url}/teams/:itemId`} component={TeamDetailContainer}/>

                <Route exact={true} path={`${matchProp.url}/players`} component={ManagePlayersContainer}/>
                <Route path={`${matchProp.url}/players/:personId&:rosterPositionId`} component={PlayerDetailContainer}/>
            </Switch>
        </Paper>
    );
}
export default withRouter(ManagementViewRouter);