import { connect } from 'react-redux';
import { fetchPlayerDetail, savePlayer } from '../../../../actions/resource/rosterpositions';
import PlayerDetailForm, { PlayerDetailFormActions, PlayerDetailProps } from '../presenters/PlayerDetailForm';
import { Dispatch } from 'redux';
import { RootState } from '../../../../reducers/index';
import { ManageItemRouteProps } from '../../shared/presenters/ManagementViewRouter';
import { RouteComponentProps } from 'react-router';
import { deepCopy, FetchedState, Player } from '../../../../models/models';
import { isNullOrUndefined } from 'util';

const emptyPlayer: Player = {
    person: {
        id: '',
        type: 'people',
        attributes: {
            first: '',
            last: '',
        },
    },
    rosterPosition: {
        id: '',
        type: 'rosterpositions',
        attributes: {
            jerseyNumber: 0,
            startDate: '',
        },
        relationships: {
            team: {
                data: {
                    type: 'teams',
                    id: '',
                },
            },
            player: {
                data: {
                    type: 'people',
                    id: '',
                },
            },
        }
    }
};

function mapStateToProps(state: RootState, ownProps: RouteComponentProps<ManageItemRouteProps>): PlayerDetailProps {
    // TODO: lordy this is ugly and bad.
    let teamId = ownProps.match.params.itemId;
    if (teamId === 'add') {
        return {
            player: deepCopy(emptyPlayer),
            isEdit: true,
            currentView: {
                fetchedState: FetchedState.FETCHED
            }
        };
    } else {
        const rosterPositionCache = state.resource.rosterPositions.data.get(teamId);
        const rosterPosition = rosterPositionCache ? rosterPositionCache.object : null;
        const person = !rosterPosition ? null
            : state.resource.people.data.get(rosterPosition.relationships.player.data.id).object;
        return {
            player: isNullOrUndefined(rosterPosition) || isNullOrUndefined(person) ? null : {rosterPosition, person},
            isEdit: false,
            currentView: {
                fetchedState: rosterPositionCache ? rosterPositionCache.fetchingState : FetchedState.NOT_FETCHED
            }
        };
    }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>, ownProps: RouteComponentProps<ManageItemRouteProps>)
    : PlayerDetailFormActions => {
    const playerId = ownProps.match.params.itemId;
    return {
        fetchItemDetail: function () {
            dispatch(fetchPlayerDetail(playerId));
        },
        savePlayer: function(player: Player) {
            dispatch(savePlayer(player));
        }
    };
};

const PlayerDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerDetailForm);

export default PlayerDetailContainer;