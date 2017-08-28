import React from 'react'
import {connect} from 'react-redux'
import ManagementList from '../ManagementList'
import TeamListItem from "../TeamListItem";
import {addTeam} from "../../actions/teams";

//TODO: no presentation components in state containers?
const getChildListItems = (teams) => {
    return Object.values(teams).map(team => <TeamListItem key={team.id} team={team} />);
};

const mapStateToProps = state => {
    return {
        title: 'Teams',
        children: getChildListItems(state.data.teams)
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onClickAdd: team => {
            dispatch(addTeam(team))
        }
    }
};

const TeamManagementList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManagementList);

export default TeamManagementList