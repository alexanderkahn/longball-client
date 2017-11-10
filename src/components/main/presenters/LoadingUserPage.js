// @flow

import React from 'react';
import Card, {CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import 'typeface-faster-one';
import LoadingProgressIndicator from "../../shared/presenters/LoadingProgressIndicator";

const styles = {
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    card: {
        minWidth: 275,
        maxWidth: 500,
        marginTop: 25,
    },
    title: {
        fontFamily: 'Faster one',
        transform: 'scale(1, 1.25)',
        // color: theme.palette.primary['A700'],
        fontSize: 75,
        padding: 20,
    },
    progressWrapper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
};

function LoadingUserPage() {
    return (
        <div style={styles.root}>
            <Card style={styles.card}>
                <CardContent>
                    <Typography style={styles.title} align="center" type="headline">
                        Dingerz!
                    </Typography>
                    <br/>
                    <div style={styles.progressWrapper}>
                        <LoadingProgressIndicator enabled={true}/>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default LoadingUserPage;