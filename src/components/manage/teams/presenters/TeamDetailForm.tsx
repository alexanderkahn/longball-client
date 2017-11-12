import * as React from 'react';
import {Component} from "react";
import {TextField} from "material-ui";
import {CurrentView, Team} from "../../../../models/models";
import ManagementItemDetail from "../../shared/presenters/ManagementItemDetail";

const styles = {
    root: {
        padding: 10,
    },
    input: {
        display: 'block',
    }
};

interface TeamDetailFormProps {
    team?: Team,
    currentView: CurrentView,
    resetView: Function,
    fetchItemDetail: Function,
}

export default class TeamDetailForm extends Component<TeamDetailFormProps> {
    render() {
        const {team, currentView, resetView, fetchItemDetail} = this.props;
        return (
            <ManagementItemDetail currentView={currentView} resetView={resetView} fetchItemDetail={fetchItemDetail}>
                {TeamDetailForm.getForm(team)}
            </ManagementItemDetail>
        )
    }

    static getForm(team?: Team) {
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
