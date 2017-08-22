import React, {Component} from 'react';
import _ from 'lodash' //TODO: this is overkill. Best practice is to import only the functions you need. babel-plugin-lodash might help?
import LongballAppBar from './LongballAppBar'
import ManagementList from './ManagementList'
import {ListItem, ListItemIcon, ListItemText} from 'material-ui/List'
import DraftsIcon from 'material-ui-icons/Drafts'
import './App.css';
import 'typeface-roboto'

class LongballApp extends Component {
    render() {
        return (
            <div className="app-root">
                <LongballAppBar/>
                <AppBody/>
            </div>
        );
    }
}

function AppBody() {
    const classes = { };
    const numbersList = _.range(1, 20)
        .map(num => <ListItem key={num.toString()}><ListItemIcon><DraftsIcon/></ListItemIcon><ListItemText primary={num}/></ListItem>);
    return (
        <div className="app-body">
            <ManagementList classes={classes}>
                {numbersList}
            </ManagementList>
        </div>
    );
}

export default LongballApp;
