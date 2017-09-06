import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {DialogActions, DialogContent, DialogContentText, DialogTitle,} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import PropTypes from 'prop-types';


function DingerzCredits(props) {
    return (
        <Dialog open={true} transition={Slide} onRequestClose={props.resetCounter}>
            <DialogTitle>{"Dingerz! was made with love"}</DialogTitle>
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

DingerzCredits.propTypes = {
    resetCounter: PropTypes.func.isRequired,
};

export default DingerzCredits;