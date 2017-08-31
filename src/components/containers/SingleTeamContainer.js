import {connect} from 'react-redux'
import SingleTeamView from "../SingleTeamView";

function mapStateToProps(state, ownProps) {
    console.info(state);
    return {
        id: ownProps.match.params.teamId
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