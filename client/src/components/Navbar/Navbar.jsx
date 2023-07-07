import React,{useEffect} from 'react';
import {Link, Navigate,useNavigate} from "react-router-dom"
import  {useSelector,useDispatch} from "react-redux"
import decode from 'jwt-decode'


import logo from "../../assets/logo.png"
import search from "../../assets/search-solid.svg"
import Avatar from "../../components/Avatar/Avatar";
// import Button from "../Button/Button.jsx";
import  "./Navbar.css"
import { setCurrentUser } from '../../actions/currentUser';





const Navbar = () => {

    // var User=JSON.parse(localStorage.getItem('Profile'));
    // instead of above code we modified the code with the below  one by calling a useselector that will fetch data from
    // a state from currentUserReducer  

    var User=useSelector((state)=>state.currentUserReducer);
    const dispatch=useDispatch();
    const Navigate=useNavigate();

    useEffect(()=>{
      const token = User?.token
      if(token){
        const decodedToken=decode(token);
        if(decodedToken.exp * 1000 < new Date().getTime()){
          handleLogout();
        }
      }
      dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    },[dispatch])

    const handleLogout = () =>{
      dispatch({ type : 'LOGOUT'});
      Navigate('/')
      dispatch(setCurrentUser(null))
    }
   
  return (
    <nav className='main-nav'>
        <div className='navbar'>
            <Link to ='/' className='nav-item nav-logo'>
                <img src={logo} alt="logo"/>
            </Link>
           
            <Link to ='/' className='nav-item nav-btn'>About</Link>
            <Link to ='/' className='nav-item nav-btn'>Products</Link>
            <Link to ='/' className='nav-item nav-btn'>For Teams </Link>
              
             <form>
                <input type="text" placeholder="Search .."/>
                <img src={search} alt="search" width="18" className='search-icon'></img>


             </form>
             { User ===null?
                    <Link to='/Auth' className='nav-item nav-link'>Log in</Link>  //// true condition if user==null
                    :
                    /// from here false condition starts when user!=null;
                    <> 
                    
                          <Avatar
                          backgroundColor="#009dff"
                          px="10px"
                          py="7px"
                          borderRadius="50%"
                          color="white"
                          >
                            <Link
                              to={`/Users/${User?.result?._id}`}
                              style={{ color: "white", textDecoration: "none" }}
                              >
                              {User.result.name.charAt(0).toUpperCase()}
                            </Link>
                      </Avatar>
                            <button className='nav-item nav-link' onClick={handleLogout}>Log out</button>
                    </> 
            }
        </div>
      
    </nav>
  )
}

export default Navbar;
