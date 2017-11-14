import { connect } from 'react-redux';
import { fetchPlayerDetail } from '../../../../actions/rosterpositions';
import { resetView } from '../../../../actions/currentView';
import PlayerDetailForm, { PlayerDetailFormActions, PlayerDetailFormProps } from '../presenters/PlayerDetailForm';
import { Dispatch } from 'redux';
import { RootState } from '../../../../reducers/index';
import { ManageItemRouteProps } from '../../shared/presenters/ManagementViewRouter';
import { RouteComponentProps } from 'react-router';

function mapStateToProps(state: RootState, ownProps: RouteComponentProps<ManageItemRouteProps>):
PlayerDetailFormProps {
    // TODO: lordy this is ugly and bad.
    const rosterPosition = state.data.rosterPositions.get(ownProps.match.params.itemId);
    const person = !rosterPosition ? null : state.data.people.get(rosterPosition.relationships.player.data.id);
    return {
        rosterPosition: rosterPosition ? rosterPosition : null,
        person: person ? person : null,
        currentView: state.currentView
    };
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>, ownProps: RouteComponentProps<ManageItemRouteProps>):
    PlayerDetailFormActions => {
    const playerId = ownProps.match.params.itemId;
    return {
        resetView: function () {
            dispatch(resetView());
        },
        fetchItemDetail: function () {
            dispatch(fetchPlayerDetail(playerId));
        }
    };
};

const PlayerDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerDetailForm);

export default PlayerDetailContainer;