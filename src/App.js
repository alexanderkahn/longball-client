import React, {Component} from 'react';
import _ from 'lodash' //TODO: this is overkill. Best practice is to import only the functions you need. babel-plugin-lodash might help?
import LongballAppBar from './LongballAppBar'
import './App.css';
import 'typeface-roboto'

class LongballApp extends Component {
    render() {
        return (
            <div className="app-root">
                <LongballAppBar />
                <AppBody />
            </div>
        );
    }
}

function AppBody() {
    const numbersList = _.range(1, 20).map(num => <div key={num.toString()}>{num}</div> );
    return (
        <div className="app-body">
            <SelectorList title="List o' numbers">
                {numbersList}
            </SelectorList>
        </div>
    );
}

function SelectorList(props) {
    return (
        <div className="selector-list">
            <div className="selector-list-title">{props.title}</div>
            <div className="selector-list-body">
                {props.children}
            </div>
        </div>
    );
}

export default LongballApp;
