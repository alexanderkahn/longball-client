import * as React from 'react';
import {Component} from "react";
import {Button, TextField} from "material-ui";
import ManagementItemDetail from "../../shared/presenters/ManagementItemDetail";
import {CurrentView, League} from "../../../../models/models";

const styles = {
    root: {
        padding: 10,
    },
    input: {
        display: 'block',
    }
};

export interface LeagueDetailFormProps {
    league?: League,
    currentView: CurrentView,
}

export interface LeagueDetailFormActions {
    resetView: () => void,
    fetchItemDetail: () => void,
    toggleCurrentViewEdit: () => void,
}

export default class LeagueDetailForm extends Component<LeagueDetailFormProps & LeagueDetailFormActions> {
    render() {
        const {currentView, resetView, league, fetchItemDetail, toggleCurrentViewEdit} = this.props;
        return (
            <ManagementItemDetail currentView={currentView} resetView={resetView} fetchItemDetail={fetchItemDetail}>
                {this.getForm(currentView.isEdit, toggleCurrentViewEdit, league)}
            </ManagementItemDetail>
        );
    }

    getForm(isEdit: boolean, toggleEdit: () => void, league?: League) {
        if (!league) {
            return <div>I can't find the league you requested!</div>
        } else {
            return (
                <form style={styles.root}>
                    <TextField style={styles.input}
                               disabled={true}
                               id="name"
                               label="Name"
                               value={league.attributes.name}/>
                    <EditSaveToggle isEdit={isEdit} toggleEdit={toggleEdit}/>
                </form>
            );
        }
    }
}

function EditSaveToggle(props: {isEdit: boolean, toggleEdit: () => void}) {
    if (props.isEdit) {
        return (
            <div>
                <Button onClick={props.toggleEdit}>Cancel</Button>
                <Button>Save</Button>
            </div>
        )
    } else {
        return (
            <div>
                <Button onClick={props.toggleEdit}>Edit</Button>
            </div>
        );
    }
}
