import './App.css'
import  View from './components/View';
import { useState, React } from "react";
import MyContext from "./components/MyContext"
import ComponentForContext from "./components/ComponentForContext"

function App() {
  const [text, setText] = useState("")

  return (
    <>
    <MyContext.Provider value={{ text, setText }}>
      <View/>
      <ComponentForContext/>
    </MyContext.Provider>
    </>
  )
}

export default App
