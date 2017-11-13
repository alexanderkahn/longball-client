import {connect} from 'react-redux'
import {fetchLeagues} from "../../../../actions/leagues";
import ManageLeaguesForm, {ManageLeaguesActions, ManageLeaguesProps} from "../presenters/ManageLeaguesForm";
import {resetView} from "../../../../actions/currentView";

const mapStateToProps = (state: any): ManageLeaguesProps => {
    return {
        leagues: Object.values(state.data.leagues),
        currentView: state.currentView
    }
};

const mapDispatchToProps = (dispatch: any): ManageLeaguesActions => {
    return {
        resetView: () => dispatch(resetView()),
        fetchListItems: () => dispatch(fetchLeagues(0))
        }
};

const ManageLeaguesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageLeaguesForm);

export default ManageLeaguesContainer