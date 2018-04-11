import * as React from 'react';
import { Component, CSSProperties } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import UserControlContainer from '../containers/UserLogControlContainer';
import LongballCreditsContainer from '../containers/LongballCreditsContainer';

const styles: CSSProperties = {
    root: {
        width: '100%',
        marginBottom: 30,
    },
    title: {
        flex: 1,
    },
};

interface HeaderProps {
    showCredits: boolean;
    incrementCounter: () => void;
    resetCounter: () => void;
}

export default class Header extends Component<HeaderProps> {
    render() {
        const showCredits = this.props.showCredits;
        const onClick = showCredits ? this.props.resetCounter : this.props.incrementCounter;

        return (
            <div style={styles.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton color="contrast" aria-label="Menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography type="title" color="inherit" style={styles.title}>
                            <span onClick={onClick}>Longball</span>
                        </Typography>
                        <UserControlContainer />
                    </Toolbar>
                </AppBar>
                {showCredits && <LongballCreditsContainer/>}
            </div>
        );
    }
}