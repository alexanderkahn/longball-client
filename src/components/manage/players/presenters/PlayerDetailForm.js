import React, {Component} from "react";
import {TextField} from "material-ui";
import {withStyles} from 'material-ui/styles';
import {personProp, rosterPositionProp} from "../../../../models/models";

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
        const {rosterPosition, person, classes} = this.props;
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
};

export default withStyles(styles)(PlayerDetailForm);