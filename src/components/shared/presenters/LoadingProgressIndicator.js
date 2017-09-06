import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {CircularProgress} from "material-ui/Progress";

const styles = theme => ({
    root: {
        display: 'block',
        width: '100%',
        margin: '0 auto',
        paddingTop: 10,
        paddingBottom: 10,
    }
});

function LoadingProgressIndicator(props) {
    const classes = props.classes;
    if (props.enabled) {
        return <CircularProgress className={classes.root}/>
    } else {
        return <span/>
    }
}

LoadingProgressIndicator.propTypes = {
    enabled: PropTypes.bool.isRequired
};

export default withStyles(styles)(LoadingProgressIndicator);