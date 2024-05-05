import React, { useContext, useEffect, useState } from 'react'
import { Alert, Col, Image, Row } from 'react-bootstrap'
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { loginapi } from './service/Allapi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginContext, registerContext } from './usercontext/Contextshare';





function Login() {
  const { registerData, setregisterData } = useContext(registerContext)
  const { loginData, setloginData } = useContext(loginContext)
  console.log(loginData);

  const [login, setlogin] = useState({
    email: "",
    password: ""
  })


  const navigate = useNavigate()

  const [error, seterror] = useState("")

  const userlogin = (e) => {
    let value = (e.target.value)
    let name = (e.target.name)

    setlogin({ ...login, [name]: value })
  }
  console.log(login);


  const handlesubmit = async (e) => {
    e.preventDefault()

    const { email, password } = login
    console.log(email,password);

    if (email == "") {
      toast.warning("email required")
    }
    else if (password == "") {
      toast.warning("password required")
    }
    else {

      const response = await loginapi(login)
      console.log(response.data);
      if (response.status == 200) {
        setloginData(response.data);
       
        localStorage.setItem('login',JSON.stringify(response.data))

        setlogin({
          ...login,
          email: "",
          password: ""
        })
        alert("logged in successfully")


        navigate("buslist")

      }
      else {
        seterror(response.response)
      }


    }

  }

  return (
    <div className=' mt-5'>
      {error ?
        [

          'warning',

        ].map((variant) => (
          <Alert key={variant} variant={variant} style={{ height: "10%" }} onClose={() => seterror("")} dismissible>
            {error}
          </Alert>
        )) : ""}
      {registerData ?
        [

          'success',

        ].map((variant) => (
          <Alert key={variant} variant={variant} style={{ height: "10%" }} onClose={() => seterror("")} dismissible>
            {`${registerData.sname} account created successfully`}
          </Alert>
        )) : ""}

      <Row>
        <Col lg={5} className=''>
          <div className='sign'>
            <div class="cam rounded-bottom-1"></div>
            <h1 className='heading'>Sign In </h1>
            <div class="inputlo form-floating mb-3">
              <input type="email" class="form-control" id="floatingInput" name='email' onChange={userlogin} required placeholder="name@example.com"></input>
              <label for="floatingInput">Email address</label>
            </div>
            <div class="inputlo form-floating">
              <input type="password" class="form-control" name='password' onChange={userlogin} required id="floatingPassword" placeholder="Password"></input>
              <label for="floatingPassword">Password</label>
            </div>
            <button className='btn btn-info mt-4' onClick={handlesubmit} >Sign in</button>
            <p className='mt-4 p-4'>Don't have an account ? <Link to={"register"}><a>Please Sign Up</a></Link></p>
            <div className='circle rounded-circle  '></div>
          </div>

        </Col>
        <Col lg={6}>
          <div id="carouselExampleFade" class="carousel slide carousel-fade">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="https://i.postimg.cc/bJtT3L31/generic-banner-Ind.png" class="d-block w-100" alt="..." />
              </div>
              <div class="carousel-item">
                <img src="https://i.postimg.cc/bJtT3L31/generic-banner-Ind.png" class="d-block w-100" alt="..." />
              </div>
              <div class="carousel-item">
                <img src="https://i.postimg.cc/bJtT3L31/generic-banner-Ind.png" class="d-block w-100" alt="..." />
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>

        </Col>

      </Row>

      <ToastContainer position="top-center" theme="colored" />

      <Link to={"admin"}><button className='admin btn btn-light '>Admin</button></Link>

    </div>

  )

}

export default Login

