import { Routes } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import Header from "./components/Header"

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
      </Routes>
    </>
  )
}

export default App
