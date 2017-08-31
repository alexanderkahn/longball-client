import {connect} from 'react-redux'
import SingleTeamView from "../SingleTeamView";

function mapStateToProps(state, ownProps) {
    return {
        team: state.data.teams[ownProps.match.params.teamId],
    }
}

const mapDispatchToProps = dispatch => {
    return {}
};

const SingleTeamContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleTeamView);

export default SingleTeamContainer