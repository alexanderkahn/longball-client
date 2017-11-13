import {connect} from 'react-redux'
import {fetchLeagues} from "../../../../actions/leagues";
import ManageLeaguesForm, {ManageLeaguesActions, ManageLeaguesProps} from "../presenters/ManageLeaguesForm";

const mapStateToProps = (state: any): ManageLeaguesProps => {
    return {
        leagues: Object.values(state.data.leagues),
        isFetching: state.currentView.isFetching,
        lastFetched: state.currentView.lastUpdated,
    }
};

const mapDispatchToProps = (dispatch: any): ManageLeaguesActions => {
    return {
        fetchListItems: function () {
            dispatch(fetchLeagues(0));
        },
    }
};

const ManageLeaguesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageLeaguesForm);

export default ManageLeaguesContainer