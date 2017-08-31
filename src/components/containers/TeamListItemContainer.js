import {connect} from 'react-redux'
import TeamListItem from "../TeamListItem";
import {push} from "react-router-redux";

const mapStateToProps = (state, ownProps) => {
    return {
        team: ownProps.team,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onClick: teamDetailRoute => {
            return function () {
                dispatch(push(teamDetailRoute));
            }
        },
    }
};

const TeamListItemContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamListItem);

export default TeamListItemContainer