import React, {Component} from "react";
import PropTypes from 'prop-types';
import {TextField} from "material-ui";
import {withStyles} from 'material-ui/styles';
import {currentViewProp, teamProp} from "../../../../models/models";
import ManagementItemDetail from "../../shared/presenters/ManagementItemDetail";

const styles = theme => ({
    root: {
        padding: 10,
    },
    input: {
        display: 'block',
    }
});

class TeamDetailForm extends Component {
    render() {
        const {team, currentView, resetView, fetchItemDetail, classes} = this.props;
        return (
            <ManagementItemDetail currentView={ currentView} resetView={resetView} fetchItemDetail={fetchItemDetail}>
                {this.getForm(team, classes)}
            </ManagementItemDetail>
        )
    }

    getForm(team, classes) {
        if (!team) {
            return <div>I can't find the requested team</div>
        } else {
            return (
                <form className={classes.root}>
                    <TextField className={classes.input}
                               disabled={true}
                               id="abbreviation"
                               label="Abbreviation"
                               value={team.attributes.abbreviation}/>
                    <TextField className={classes.input}
                               disabled={true}
                               id="location"
                               label="Location"
                               value={team.attributes.location}/>
                    <TextField className={classes.input}
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

export default withStyles(styles)(TeamDetailForm);