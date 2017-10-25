import React from 'react'
import {connect} from 'react-redux'
import ManagementList from '../../shared/presenters/ManagementList'
import {fetchTeams} from "../../../../actions/teams";
import TeamListItem from "../presenters/TeamListItem";

//TODO: no presentation components in state containers?
const getChildListItems = (teams) => {
    return Object.values(teams).map(team => <TeamListItem key={team.id} team={team}/>);
};

const mapStateToProps = state => {
    return {
        title: 'Teams',
        listItems: getChildListItems(state.data.teams),
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
)(ManagementList);

export default ManageTeamsContainer