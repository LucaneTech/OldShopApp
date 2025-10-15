import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Navbar from "../components/Navbar"
import Home from "../pages/Home"
import ProductForm from "../pages/Add"
import Details from "../pages/Details"
const App = () => {
  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={<Navbar/>}>
          <Route index element= {<Home/>}/>
          <Route path="/add" element ={<ProductForm/>}/>
          <Route path="/product/:id" element ={<Details/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App