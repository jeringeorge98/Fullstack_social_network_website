import React, { Component } from "react";
import Navigator from "./core/Mainavigator";
//import Home from "../src/core/home";
import {BrowserRouter} from "react-router-dom"
export default class App extends Component {
  render() {
    return (
        <BrowserRouter>
        <Navigator/>
        
        </BrowserRouter>

    );
  }
}
