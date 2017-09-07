import React from 'react';
import {withStyles} from 'material-ui/styles';
import Card, {CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import 'typeface-faster-one';
import {CircularProgress} from "material-ui/Progress";

const styles = theme => ({
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
        color: theme.palette.primary['A700'],
        fontSize: 75,
        padding: 20,
    },
    progressWrapper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

function LoadingUserPage(props) {
    const classes = props.classes;
    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} align="center" type="headline">
                        Dingerz!
                    </Typography>
                    <br/>
                    <div className={classes.progressWrapper}>
                        <CircularProgress/>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default withStyles(styles)(LoadingUserPage);