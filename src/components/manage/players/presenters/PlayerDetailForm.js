import React, {Component} from "react";
import PropTypes from 'prop-types';
import {TextField} from "material-ui";
import {personProp, rosterPositionProp, currentViewProp} from "../../../../models/models";
import ManagementItemDetail from "../../shared/presenters/ManagementItemDetail";

const styles = {
    root: {
        padding: 10,
    },
    input: {
        display: 'block',
    }
};

class PlayerDetailForm extends Component {
    render() {
        const {rosterPosition, person, currentView, resetView, fetchItemDetail} = this.props;
        return (
            <ManagementItemDetail currentView={currentView} resetView={resetView} fetchItemDetail={fetchItemDetail}>
                {PlayerDetailForm.getForm(rosterPosition, person)}
            </ManagementItemDetail>
        );
    }

    static getForm(rosterPosition, person) {
        if (!rosterPosition) {
            return <div>I can't find the selected player</div>
        } else {
            return (
                <form style={styles.root}>
                    <TextField style={styles.input}
                               disabled={true}
                               id="first"
                               label="First Name"
                               value={person.attributes.first}/>
                    <TextField style={styles.input}
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

export default PlayerDetailForm;