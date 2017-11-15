import * as React from 'react';
import { CircularProgress } from 'material-ui/Progress';
import { CSSProperties } from 'react';

const styles: CSSProperties = {
    root: {
        display: 'block',
        margin: '0 auto',
        paddingTop: 10,
        paddingBottom: 10,
    }
};

interface LoadingProgressIndicatorProps {
    enabled: boolean;
}

export default function LoadingProgressIndicator(props: LoadingProgressIndicatorProps) {
    if (props.enabled) {
        return <CircularProgress style={styles.root}/>;
    } else {
        return <span/>;
    }
}