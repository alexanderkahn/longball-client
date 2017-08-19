import React, {Component} from 'react';

class UserSessionControl extends Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {isLoggedIn: false};
    }

    render() {
        let onClick = this.handleLogoutClick;
        let labelText = "Hi, Guy!";

        const isLoggedIn = this.state.isLoggedIn;
        if (!isLoggedIn) {
            onClick = this.handleLoginClick;
            labelText = "Log in";
        }

        return  <span className="header-user"><UserLabel onClick={onClick} labelText={labelText}/></span>
    }

    handleLoginClick() {
        this.setState({isLoggedIn: true});
    }

    handleLogoutClick() {
        this.setState({isLoggedIn: false});
    }
}

function UserLabel(props) {
    const onClick = props.onClick;
    const labelText = props.labelText;
    return <a href="#" onClick={onClick}>{labelText}</a>
}

export default UserSessionControl