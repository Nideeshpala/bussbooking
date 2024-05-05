import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import './register.css';
import { registerapi } from './service/Allapi';

import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Alert from 'react-bootstrap/Alert';
import { registerContext } from './usercontext/Contextshare';








function Register() {



    const {registerData,setregisterData} = useContext(registerContext)
    

    const [newaccount, setnewaccount] = useState({

        sname: "",
        email: "",
        password: "",
        gender: "",
        dob: "",
        cpassword: ""


    })





    const navigate = useNavigate()

    const userdetails = (e) => {
        let value = (e.target.value);
        let name = (e.target.name);
        setnewaccount({ ...newaccount, [name]: value })

    }
    console.log(newaccount);




    const [errormsg, seterrmsg] = useState("")




    useEffect(() => {

    }, [])


    const handlesubmit = async (e) => {
        e.preventDefault()

        const { sname, email, password, gender, dob, cpassword } = newaccount



        if (sname == "") {
            toast.warning("sname required")
        }
        else if (email == "") {
            toast.warning("email required")
        }
        else if (dob == "") {
            toast.warning("dob required")
        }

        else if (gender == "") {
            toast.warning("gender required")
        }
        else if (password == "") {
            toast.warning("password required")

        }
        else if (cpassword == "") {
            toast.warning("cpassword required")
        }

        else {

            // data.append("sname", sname)
            // data.append("email", email)
            // data.append("password", password)
            // data.append("gender", gender)
            // data.append("dob", dob)


            // console.log(data);


            if (password == cpassword) {
                const response = await registerapi(newaccount)
                

                if (response.status == 200) {
                    setregisterData(newaccount);
                      console.log(registerData);

                    setnewaccount({
                        ...newaccount,
                        name: "",
                        email: "",
                        password: "",
                        gender: "",
                        dob: "",
                        cpassword: ""
                    })
                    
                    alert("account created successfully")
                    navigate('/')

                }
                else {
                    seterrmsg(response.response.data)
                }
            }
            else {
                seterrmsg("password doesn't match");
            }
        }


    }

    return (
        <div className='mt-5'>

            {errormsg ?
                [

                    'warning',

                ].map((variant) => (
                    <Alert key={variant} variant={variant} style={{ height: "10%" }} onClose={() => seterrmsg("")} dismissible>
                        {errormsg}
                    </Alert>
                )) : ""}
            <Row>
                <Col lg={5} className=''>
                    <Form >
                        <div className='register shadow-lg'>
                            <div class="cam rounded-bottom-1"></div>
                            <h1 className='heading'>Sign Up </h1>
                            <div className='lane1'>
                                <div class="inputre form-floating mb-3">
                                    <input type="text" class="form-control" name='sname' onChange={userdetails} required id="sname" placeholder="Name"></input>
                                    <label for="Name">Name</label>
                                </div>
                                <div class="inputre form-floating mb-3">
                                    <input type="text" class="form-control" id="email" name='email' onChange={userdetails} required placeholder="Email"></input>
                                    <label for="floatingemail">Email</label>
                                </div>
                            </div>
                            <div className='lane2'>

                                <div class="dob inputre form-floating mb-3  ">
                                    <input type="date" class="form-control" id="dob" name='dob' onChange={userdetails} required placeholder="Date of Birth"></input>
                                    <label for="floatingdate"></label>
                                </div>
                                <Form>
                                    {['radio'].map((type) => (
                                        <div key={`reverse-${type}`} className="gender  ">
                                            <Form.Check // prettier-ignore
                                                type={type}
                                                id={`reverse-${type}-1`}
                                                onChange={userdetails}
                                                label="Male"
                                                name='gender'
                                                value={"Male"}
                                                required
                                            />

                                            <Form.Check

                                                type={type}
                                                label="Female"
                                                onChange={userdetails}
                                                name='gender'
                                                value={"Female"}
                                                id={`reverse-${type}-2`}

                                            />
                                        </div>
                                    ))}
                                </Form>
                            </div>
                            <div className='lane3'>
                                <div class="inputre form-floating">
                                    <input type="password" class="form-control" id="password" name='password' onChange={userdetails} required placeholder="Password" />
                                    <label for="floatingPassword">Password</label>
                                </div>
                                <div class="inputre form-floating">
                                    <input type="password" class="form-control" id="cpassword" onChange={userdetails} name='cpassword' required placeholder="Password" />
                                    <label for="floatingPassword">Confirm Password</label>
                                </div>



                            </div>


                            <button className='btn btn-info mt-5 ' onClick={handlesubmit} type='submit' >Sign Up</button>

                            <div className='circlere rounded-circle shadow-lg '></div>
                        </div>
                    </Form>

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

        
        </div>
    )
}

export default Register