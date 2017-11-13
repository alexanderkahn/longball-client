import {connect} from 'react-redux'
import {fetchTeams} from "../../../../actions/teams";
import ManageTeamsForm, {ManageTeamsFormActions, ManageTeamsFormProps} from "../presenters/ManageTeamsForm";

const mapStateToProps = (state: any): ManageTeamsFormProps => {
    return {
        teams: Object.values(state.data.teams),
        isFetching: state.currentView.isFetching,
        lastFetched: state.currentView.lastUpdated
    }
};

const mapDispatchToProps = (dispatch: any): ManageTeamsFormActions => {
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