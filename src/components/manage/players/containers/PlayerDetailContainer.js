import {connect} from 'react-redux'
import PlayerDetail from "../presenters/PlayerDetail";
import {fetchPlayerDetail} from "../../../../actions/rosterpositions";
import {resetView, setCurrentViewFetching} from "../../../../actions/currentView";

function mapStateToProps(state, ownProps) {
    const rosterPosition = state.data.rosterPositions[ownProps.match.params.playerId];
    const person = !rosterPosition ? null : state.data.people[rosterPosition.relationships.player.data.id];
    return {
        selectedPlayerId: ownProps.match.params.playerId,
        rosterPosition,
        person,
        currentView: state.currentView
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetView: function () {
            dispatch(resetView());
        },
        fetchPlayerDetail: function (playerId) {
            dispatch(fetchPlayerDetail(playerId));
        }
    }
};

const PlayerDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerDetail);

export default PlayerDetailContainer