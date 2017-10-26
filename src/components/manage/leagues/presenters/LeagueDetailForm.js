import React, {Component} from "react";
import {leagueProp} from "../../../../models/models";
import {withStyles} from 'material-ui/styles';
import {TextField} from "material-ui";

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
        const {league, classes} = this.props;
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
                </form>
            );
        }
    }
}

LeagueDetailForm.propTypes = {
    league: leagueProp
};

export default withStyles(styles)(LeagueDetailForm);
