import React from 'react'
import {connect} from 'react-redux'
import ManagementList from '../ManagementList'
import {fetchTeams} from "../../actions/teams";
import TeamListItemContainer from "./TeamListItemContainer";

//TODO: no presentation components in state containers?
const getChildListItems = (teams) => {
    return Object.values(teams).map(team => <TeamListItemContainer key={team.id} team={team}/>);
};

const mapStateToProps = state => {
    return {
        title: 'Teams',
        listItems: getChildListItems(state.data.teams),
        isFetching: state.routes.manageTeams.isFetching,
        lastFetched: state.routes.manageTeams.lastFetched,
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
)(ManagementList);

export default ManageTeamsContainer