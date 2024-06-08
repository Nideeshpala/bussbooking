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
  console.log(registerData);

  const [login, setLogin] = useState({
    email: "",
    password: ""
  })


  const navigate = useNavigate()

  const [error, setError] = useState("")

  const userlogin = (e) => {
    let value = (e.target.value)
    let name = (e.target.name)

    setLogin({ ...login, [name]: value })
  }
  console.log(login);


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { email, password } = login;
    setError(""); // Clear previous errors
  
    if (email === "") {
      toast.warning("Email required");
    } else if (password === "") {
      toast.warning("Password required");
    } else {
      try {
        const response = await loginapi(login);
  
        if (response.status === 200) {
          localStorage.setItem('login', JSON.stringify(response.data));
          setLogin({ email: "", password: "" });
         toast.success("loggedin succesfully")
          navigate("/buslist");
        } else if (response.status === 400) {
          setError(response.data.message || "Invalid credentials");
        } else if (response.status === 401) {
          setError("Unauthorized access");
        } else {
          setError("Login failed");
        }
      } catch (error) {
        console.error("Login error:", error);
        setError("An error occurred during login");
      }
    }
  };


  return (
    <div className='background' style={{ background: "linear-gradient(to right, rgb(237, 45, 215), rgb(74, 11, 222))", height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
      {error && (
        <Alert variant="warning" style={{ height: "10%" }} onClose={() => setError("")} dismissible>
          {error}
        </Alert>
      )}
      {registerData && (
        <Alert variant="success" style={{ height: "10%" }} onClose={() => setError("")} dismissible>
          {`${registerData.name} account created successfully`}
        </Alert>
      )}
      <Row className='w-100'>
        <Col lg={6} sm={12}>
          <div className='sign container-fluid w-50 mt-5 mb-3' style={{ backgroundColor: '' }}>
            <div className="cam  border border-light rounded-bottom-1"></div>
            <h1 className='heading'>Sign In</h1>
            <div className="inputlo form-floating mb-3">
              <input type="email" className="form-control" id="floatingInput" name='email' onChange={userlogin} required placeholder="name@example.com" />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="inputlo form-floating">
              <input type="password" className="form-control" name='password' onChange={userlogin} required id="floatingPassword" placeholder="Password" />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <button className='btn  mt-4 w-50' style={{backgroundColor:'rgb(252, 3, 181) ', color:'white'}} onClick={handleSubmit}>Sign in</button>
            <p className='mt-4 p-4'>Don't have an account? <Link to="register">Please Sign Up</Link></p>
            <div className='circle rounded-circle'></div>
          </div>
        </Col>
        <Col lg={6} sm={12} className='d-flex align-items-center'>
          <div className='column2 me-5 w-100'>
            <h1>Welcome to Air Bus</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores hic eum quae itaque dicta est perferendis id rem delectus! Cum deleniti possimus magnam blanditiis neque. Tempore, suscipit cupiditate. Ad, officiis?</p>
          </div>
        </Col>
      </Row>
      <ToastContainer position="top-center" theme="colored" />
      <Link to="admin">
        <button className='admin btn btn-light mt-3' style={{ display: 'none' }}>Admin</button>
      </Link>
    </div>







  )

}

export default Login

