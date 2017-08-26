import React from 'react'
import {connect} from 'react-redux'
import ManagementList from '../ManagementList'
import {ADD_TEAM} from "../../actions";
import TeamListItem from "../TeamListItem";

//TODO: no presentation components in state containers?
//TODO perhaps complex objects should be represented by POJsOs?
const getChildListItems = (teams) => {
    return teams.map(team => <TeamListItem team={team} />);
};

const mapStateToProps = state => {
    return {
        children: getChildListItems(state.teams)
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onClickAdd: team => {
            dispatch(ADD_TEAM(team))
        }
    }
};

const TeamManagementList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManagementList);

export default TeamManagementList