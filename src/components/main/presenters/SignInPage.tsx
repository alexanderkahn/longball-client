import * as React from 'react';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { CSSProperties } from 'react';

const styles: CSSProperties = {
    card: {
        minWidth: 275,
        maxWidth: 500,
        margin: '0 auto',
        marginTop: 25,
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
        // color: theme.palette.text.secondary,
    },
    pos: {
        marginBottom: 12,
        // color: theme.palette.text.secondary,
    },
};

interface SignInPageProps {
    startSignInFlow: () => void;
}

export default function SignInPage(props: SignInPageProps) {
    return (
        <div>
            <Card style={styles.card}>
                <CardContent>
                    <Typography type="body1" style={styles.title}>
                        Longball
                    </Typography>
                    <Typography component="p">
                       A baseball scoring app to make your weird, baseball-scoring-related dreams come true.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={props.startSignInFlow}>Log in</Button>
                </CardActions>
            </Card>
        </div>
    );
}