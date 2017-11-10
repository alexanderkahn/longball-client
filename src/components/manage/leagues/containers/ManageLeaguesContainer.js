import {connect} from 'react-redux'
import {fetchLeagues} from "../../../../actions/leagues";
import ManageLeaguesForm from "../presenters/ManageLeaguesForm";

const mapStateToProps = state => {
    return {
        title: 'Leagues',
        leagues: Object.values(state.data.leagues),
        isFetching: state.currentView.isFetching,
    }
};

const mapDispatchToProps = dispatch => {
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