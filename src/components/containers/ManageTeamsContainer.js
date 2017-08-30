import React from 'react'
import {connect} from 'react-redux'
import ManagementList from '../ManagementList'
import TeamListItem from "../TeamListItem";

//TODO: no presentation components in state containers?
const getChildListItems = (teams) => {
    return Object.values(teams).map(team => <TeamListItem key={team.id} team={team}/>);
};

const mapStateToProps = state => {
    return {
        title: 'Teams',
        listItems: getChildListItems(state.data.teams),
        isFetching: state.routes.manageTeams.isFetching,
    }
};

const mapDispatchToProps = dispatch => {
    return {}
};

const ManageTeamsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManagementList);

export default ManageTeamsContainer