import React from 'react'
import {connect} from 'react-redux'
import ManagementList from '../../shared/presenters/ManagementList'
import {fetchLeagues} from "../../../../actions/leagues";
import LeagueListItem from "../presenters/LeagueListItem";

const getChildListItems = (leagues) => {
    return Object.values(leagues).map(league => <LeagueListItem key={league.id} league={league}/>);
};

const mapStateToProps = state => {
    return {
        title: 'Leagues',
        listItems: getChildListItems(state.data.leagues),
        isFetching: state.views.manageLeagues.isFetching,
        lastFetched: state.views.manageLeagues.lastFetched,
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
)(ManagementList);

export default ManageLeaguesContainer