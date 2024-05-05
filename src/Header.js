import React, { useContext, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './Header.css'
import { loginContext, registerContext } from './usercontext/Contextshare';
import { Alert, AlertHeading, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Header() {

  const {loginData,setloginData}=useContext(loginContext)
 
    const retuserdata=JSON.parse(localStorage.getItem('login'))
    console.log(retuserdata);
    const bud=JSON.parse(localStorage.getItem('bus'))
    const navigate=useNavigate()

    const handlesubmit=async(e)=>{
      e.preventDefault()
     localStorage.removeItem('login')
     localStorage.removeItem('bus')
     
     navigate("/")
    }


 
  return (
    <div>
       <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home" id='bs'>AirBus</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
          signed in as :{
            retuserdata? 
            `${retuserdata.sname}` : <a href="#login"></a>
            }
            {retuserdata?<button className='btn btn-warning ms-5' onClick={handlesubmit}>logout</button>:""}
       
           
           
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
       
           
    </div>
  )
}

export default Header