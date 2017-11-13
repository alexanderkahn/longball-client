import { connect } from 'react-redux';
import { fetchPlayerDetail } from '../../../../actions/rosterpositions';
import { resetView } from '../../../../actions/currentView';
import PlayerDetailForm, { PlayerDetailFormActions, PlayerDetailFormProps } from '../presenters/PlayerDetailForm';

function mapStateToProps(state: any, ownProps: any): PlayerDetailFormProps {
    const rosterPosition = state.data.rosterPositions[ownProps.match.params.playerId];
    const person = !rosterPosition ? null : state.data.people[rosterPosition.relationships.player.data.id];
    return {
        rosterPosition,
        person,
        currentView: state.currentView
    };
}

const mapDispatchToProps = (dispatch: any, ownProps: any): PlayerDetailFormActions => {
    const playerId = ownProps.match.params.playerId;
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