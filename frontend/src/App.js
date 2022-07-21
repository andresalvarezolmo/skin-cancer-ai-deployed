import React, { Component } from 'react';
import { Socket } from 'socket.io-client';
import './App.css';
import Webcam from './components/webcam';

class App extends Component {
  render() {
    return (
      <Webcam></Webcam>
    );
  }
}

export default App;