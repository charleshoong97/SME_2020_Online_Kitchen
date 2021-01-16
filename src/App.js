import React, { Component } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import AllClass from './Containers/AllClass/AllClass'
import NavBar from './Components/NavBar/NavBar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <AllClass />
      </div>
    )
  }
}

export default App
