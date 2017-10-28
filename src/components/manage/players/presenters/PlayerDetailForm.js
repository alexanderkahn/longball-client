import React, {Component} from "react";
import PropTypes from 'prop-types';
import {TextField} from "material-ui";
import {withStyles} from 'material-ui/styles';
import {personProp, rosterPositionProp, currentViewProp} from "../../../../models/models";
import ManagementItemDetail from "../../shared/presenters/ManagementItemDetail";

const styles = theme => ({
    root: {
        padding: 10,
    },
    input: {
        display: 'block',
    }
});

class PlayerDetailForm extends Component {
    render() {
        const {rosterPosition, person, currentView, resetView, fetchItemDetail, classes} = this.props;
        return (
            <ManagementItemDetail currentView={currentView} resetView={resetView} fetchItemDetail={fetchItemDetail}>
                {this.getForm(rosterPosition, person, classes)}
            </ManagementItemDetail>
        );
    }

    getForm(rosterPosition, person, classes) {
        if (!rosterPosition) {
            return <div>I can't find the selected player</div>
        } else {
            return (
                <form className={classes.root}>
                    <TextField className={classes.input}
                               disabled={true}
                               id="first"
                               label="First Name"
                               value={person.attributes.first}/>
                    <TextField className={classes.input}
                               disabled={true}
                               id="last"
                               label="Last Name"
                               value={person.attributes.last}/>
                </form>
            );
        }
    }

}

PlayerDetailForm.propTypes = {
    rosterPosition: rosterPositionProp,
    person: personProp,
    currentView: currentViewProp.isRequired,
    resetView: PropTypes.func.isRequired,
    fetchItemDetail: PropTypes.func.isRequired,
};

export default withStyles(styles)(PlayerDetailForm);