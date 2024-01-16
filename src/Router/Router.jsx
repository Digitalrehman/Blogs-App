import { Route, Routes } from "react-router-dom" 
import SignUP from "../components/SignUp/SignUP"
import Login from "../components/Login/Login"
import Home from "../components/Home/Home"
import Favourite from "../components/favourite/Favourite"
import Saved from "../components/Saved/Saved"

const Router = () => {
  return (
    <>
    <Routes>
    
    <Route path='/' element={<SignUP/>}/>
    <Route path='/Login' element={<Login/>}/>
    <Route path='/Home' element={<Home/>}/>
    <Route path='/Favourite' element={<Favourite/>}/>
    <Route path='/Saved' element={<Saved/>}/>
    </Routes>
      
    </>
  )
}

export default Router
