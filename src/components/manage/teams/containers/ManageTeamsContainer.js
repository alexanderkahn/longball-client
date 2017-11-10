import {connect} from 'react-redux'
import {fetchTeams} from "../../../../actions/teams";
import ManageTeamsForm from "../presenters/ManageTeamsForm";

const mapStateToProps = state => {
    return {
        title: 'Teams',
        teams: Object.values(state.data.teams),
        isFetching: state.currentView.isFetching,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchListItems: function () {
            dispatch(fetchTeams(0));
        },
    }
};

const ManageTeamsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageTeamsForm);

export default ManageTeamsContainer