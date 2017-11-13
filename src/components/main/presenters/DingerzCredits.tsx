import * as React from 'react';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';

interface DingerzCreditsProps {
    resetCounter: () => void;
}

export default function DingerzCredits(props: DingerzCreditsProps) {
    return (
        <Dialog open={true} transition={Slide} onRequestClose={props.resetCounter}>
            <DialogTitle>{'Dingerz! was made with love'}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Producer: Garran Ingersoll
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.resetCounter} color="primary">
                    OK...?
                </Button>
            </DialogActions>
        </Dialog>
    );
}