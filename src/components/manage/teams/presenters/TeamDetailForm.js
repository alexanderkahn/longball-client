import React, {Component} from "react";
import PropTypes from 'prop-types';
import {TextField} from "material-ui";
import {currentViewProp, teamProp} from "../../../../models/models";
import ManagementItemDetail from "../../shared/presenters/ManagementItemDetail";

const styles = {
    root: {
        padding: 10,
    },
    input: {
        display: 'block',
    }
};

class TeamDetailForm extends Component {
    render() {
        const {team, currentView, resetView, fetchItemDetail} = this.props;
        return (
            <ManagementItemDetail currentView={ currentView} resetView={resetView} fetchItemDetail={fetchItemDetail}>
                {this.getForm(team)}
            </ManagementItemDetail>
        )
    }

    getForm(team) {
        if (!team) {
            return <div>I can't find the requested team</div>
        } else {
            return (
                <form style={styles.root}>
                    <TextField style={styles.input}
                               disabled={true}
                               id="abbreviation"
                               label="Abbreviation"
                               value={team.attributes.abbreviation}/>
                    <TextField style={styles.input}
                               disabled={true}
                               id="location"
                               label="Location"
                               value={team.attributes.location}/>
                    <TextField style={styles.input}
                               disabled={true}
                               id="nickname"
                               label="Nickname"
                               value={team.attributes.nickname}/>
                </form>
            );
        }
    }
}

TeamDetailForm.propTypes = {
    team: teamProp,
    currentView: currentViewProp.isRequired,
    resetView: PropTypes.func.isRequired,
    fetchItemDetail: PropTypes.func.isRequired,
};

export default TeamDetailForm;