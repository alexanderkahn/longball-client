// @flow

import React from 'react';
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

interface LoadingProgressIndicatorProps {
    enabled: boolean
}

export default function LoadingProgressIndicator(props: LoadingProgressIndicatorProps) {
    if (props.enabled) {
        return <CircularProgress style={styles.root}/>
    } else {
        return <span/>
    }
}