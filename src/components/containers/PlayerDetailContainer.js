import {connect} from 'react-redux'
import PlayerDetail from "../PlayerDetail";
import {fetchPlayerDetail, selectPlayerDetail} from "../../actions/players";

function mapStateToProps(state, ownProps) {
    return {
        selectedPlayerId: ownProps.match.params.playerId,
        playerDetailView: state.views.playerDetail,
        player: state.data.players[ownProps.match.params.playerId],
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectPlayerDetail: function (playerId) {
            dispatch(selectPlayerDetail(playerId));
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