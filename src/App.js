import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class LongballApp extends Component {
  render() {
    return (
      <div className="longball-app">
        <div className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
          <h2 className="app-title">Longball</h2>
        </div>
      </div>
    );
  }
}

export default LongballApp;
