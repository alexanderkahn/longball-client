import React from 'react';
import PropTypes from 'prop-types';
import {CircularProgress} from "material-ui/Progress";

const styles = {
    root: {
        display: 'block',
        width: '100%',
        margin: '0 auto',
        paddingTop: 10,
        paddingBottom: 10,
    }
};

function LoadingProgressIndicator(props) {
    if (props.enabled) {
        return <CircularProgress style={styles.root}/>
    } else {
        return <span/>
    }
}

LoadingProgressIndicator.propTypes = {
    enabled: PropTypes.bool.isRequired
};

export default LoadingProgressIndicator;