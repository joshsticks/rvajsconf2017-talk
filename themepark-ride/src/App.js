import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import openSocket from "socket.io-client";
import Rx from "rxjs";

class App extends Component {
  constructor(props) {
    super(props);

    let that = this;
    this.state = { rfids: [] };
    const socketObservable = Rx.Observable.create(observer => {
      const socket = openSocket("http://localhost:3000");
      socket.on("rfid", function(msg) {
        let decoder = new TextDecoder();
        let decodedMessageText = decoder.decode(msg);
        observer.next(decodedMessageText);
      });
    });

    socketObservable.subscribe(val => {
      let rfids = that.state.rfids;
      rfids.push(val);
      that.setState({ rfids: rfids });
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <ul>
          {this.state.rfids.map((rfid, i) => {
            return <li key={i}>{rfid}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default App;
