import React, {Component} from "react";
import PropTypes from 'prop-types';
import {leagueProp} from "../../../../models/models";
import {withStyles} from 'material-ui/styles';
import {Button, TextField} from "material-ui";
import ManagementItemDetail from "../../shared/presenters/ManagementItemDetail";
import {currentViewProp} from "../../../../models/models";

const styles = theme => ({
    root: {
        padding: 10,
    },
    input: {
        display: 'block',
    }
});

class LeagueDetailForm extends Component {
    render() {
        const {currentView, resetView, league, fetchItemDetail, toggleEdit, classes} = this.props;
        return (
            <ManagementItemDetail currentView={currentView} resetView={resetView} fetchItemDetail={fetchItemDetail}>
                {this.getForm(league, currentView.isEdit, toggleEdit, classes)}
            </ManagementItemDetail>
        );
    }

    getForm(league, isEdit, toggleEdit, classes) {
        if (!league) {
            return <div>I can't find the league you requested!</div>
        } else {
            return (
                <form className={classes.root}>
                    <TextField className={classes.input}
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

class EditSaveToggle extends Component {
    render() {
        const {isEdit, toggleEdit} = this.props;
        if (isEdit) {
            return (
                <div>
                    <Button onClick={toggleEdit}>Cancel</Button>
                    <Button>Save</Button>
                </div>
            )
        } else {
            return (
                <div>
                    <Button onClick={toggleEdit}>Edit</Button>
                </div>
            );
        }
    }
}

LeagueDetailForm.propTypes = {
    league: leagueProp,
    currentView: currentViewProp.isRequired,
    resetView: PropTypes.func.isRequired,
    fetchItemDetail: PropTypes.func.isRequired,
    toggleEdit: PropTypes.func.isRequired,
};

export default withStyles(styles)(LeagueDetailForm);
