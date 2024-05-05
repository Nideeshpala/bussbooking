import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import "./Buslayout.css"
import Button from 'react-bootstrap/Button';
import { useParams, useNavigate } from 'react-router-dom';
import { bookapi, getbos } from './service/Allapi';
import { BussContext, loginContext } from './usercontext/Contextshare';
import DateObject from "react-date-object";




function Buslayout() {


    //    states
    const [sename, setname] = useState("")
    const [bus, setbus] = useState("")

    const { loginData, setloginData } = useContext(loginContext)
    const [age, setage] = useState("")
    const navigate = useNavigate()
    const { id } = useParams()
    const user = JSON.parse(localStorage.getItem('login'))
    const sin= JSON.parse(localStorage.getItem('buss'))
   
    // console.log(user);
    const [book, setbook] = useState({
        sename,
        sname:user.sname,
        gender:user.gender,
        email:user.email,
       busname:sin.busname,
        busno:sin.busno,
        from:sin.from,
        to:sin.to,
        price:sin.price,
        age,
       
       
    })

    console.log(book);






    // seat no pickking

    const handleclick = event => {
        const name = (event.target.name);
        const id = (event.target.id);
        setname(name)
    }
    console.log(sename);

    // console.log(busdet);
    //    user set into local storage





    //single bus api 

    // age conversion

    let date = new Date(user.dob);

    const calculateAge = async () => {
        if (user && user.dob) {
            const currentDate = new Date();
            const birthDate = new Date(user.dob);
            let age = currentDate.getFullYear() - birthDate.getFullYear();
            const monthDiff = currentDate.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
                age--;
            }
            // Update age state
            setage(age)



        }
    }
    console.log(age);

   
    const buss = async () => {
        const response = await getbos(id)

        localStorage.setItem("buss",JSON.stringify(response.data))
    
        setbus(response.data)
      
       

    }
    console.log("bus",bus);




    const handlebook = async (e) => {
        e.preventDefault()




        try {

            const responce = await bookapi(book)

            if (responce.status == 200) {
                alert('Booking successful:', responce);
                navigate('/buslist')
            
            }

            else {
                alert("something went wrong pl")
            }
        }
        catch (err) {
            console.log("booking error");

        }





    }
    useEffect(() => {
        if (!user) {
            navigate("/")
        }

        buss()
        calculateAge();
        
       




    },[])
    console.log(bus);




    return (
        <div>
            <h3>Seat No: {sename} </h3>

            <Row className='w-100'>
                <Col lg={6} xl={6} >



                    <div className='busbody'>
                        <div>
                            <img className='steering' src="https://i.postimg.cc/2jtjqCGx/pngtree-sports-car-steering-wheel-icon-flat-style-png-image-5254985.jpg" alt="" />
                        </div>

                        <div className='door'></div>
                        <div className='first '>
                            <div className='primary'>
                                <Button variant="outline-success" onClick={handleclick} name='A1' id='S1'>A1</Button>{' '}
                                <Button variant="outline-success" onClick={handleclick} name='A2' id='S2'>A2</Button>{' '}
                                <Button variant="outline-success" onClick={handleclick} name='A3' id='S3'>A3</Button>{' '}




                            </div>
                            <div className='secondary'>
                                <Button variant="outline-success" onClick={handleclick} name='A4' id='S4'>A4</Button>{' '}
                                <Button variant="outline-success" onClick={handleclick} name='A5' id='S5'>A5</Button>{' '}

                            </div>

                        </div>
                        <div className='second'>
                            <div className='primary'>
                                <Button variant="outline-success" onClick={handleclick} name='B1' id='S6'>B1</Button>{' '}
                                <Button variant="outline-success" onClick={handleclick} name='B2' id='S7'>B2</Button>{' '}
                                <Button variant="outline-success" onClick={handleclick} name='B3' id='S8'>B3</Button>{' '}




                            </div>
                            <div className='secondary'>
                                <Button variant="outline-success" onClick={handleclick} name='B4' id='S9'>B4</Button>{' '}
                                <Button variant="outline-success" onClick={handleclick} name='B5' id='S10'>B5</Button>{' '}

                            </div>

                        </div>
                        <div className='third'>
                            <div className='primary'>
                                <Button variant="outline-success" onClick={handleclick} name='C1' id='S11'>C1</Button>{' '}
                                <Button variant="outline-success" onClick={handleclick} name='C2' id='S12'>C2</Button>{' '}
                                <Button variant="outline-success" onClick={handleclick} name='C3' id='S13'>C3</Button>{' '}




                            </div>
                            <div className='secondary'>
                                <Button variant="outline-success" onClick={handleclick} name='C4' id='S14'>C4</Button>{' '}
                                <Button variant="outline-success" onClick={handleclick} name='C5' id='S15'>C5</Button>{' '}

                            </div>

                        </div>

                        <div className='forth'>
                            <div className='primary'>
                                <Button variant="outline-success" onClick={handleclick} name='D1' id='S16'>D1</Button>{' '}
                                <Button variant="outline-success" onClick={handleclick} name='D2' id='S17'>D2</Button>{' '}
                                <Button variant="outline-success" onClick={handleclick} name='D3' id='S18'>D3</Button>{' '}




                            </div>
                            <div className='secondary'>
                                <Button variant="outline-success" onClick={handleclick} name='D4' id='S19'>D4</Button>{' '}
                                <Button variant="outline-success" onClick={handleclick} name='D5' id='S20'>D5</Button>{' '}

                            </div>

                        </div>

                        <div className='fifth'>
                            <div className='primary'>
                                <Button variant="outline-success" onClick={handleclick} name='E1' id='S21'>E1</Button>{' '}
                                <Button variant="outline-success" onClick={handleclick} name='E2' id='S22'>E2</Button>{' '}
                                <Button variant="outline-success" onClick={handleclick} name='E3' id='S23'>E3</Button>{' '}




                            </div>
                            <div className='secondary'>
                                <Button variant="outline-success" onClick={handleclick} name='E4' id='S24'>E4</Button>{' '}
                                <Button variant="outline-success" onClick={handleclick} name='E5' id='S25'>E5</Button>{' '}

                            </div>

                        </div>

                        <div className='sixth'>
                            <div className='primary'>
                                <Button variant="outline-success" onClick={handleclick} name='F1' id='S26'>F1</Button>{' '}
                                <Button variant="outline-success" onClick={handleclick} name='F2' id='S27'>F2</Button>{' '}
                                <Button variant="outline-success" onClick={handleclick} name='F3' id='S28'>F3</Button>{' '}




                            </div>
                            <div className='secondary'>
                                <Button variant="outline-success" onClick={handleclick} name='F4' id='S29'>F4</Button>{' '}
                                <Button variant="outline-success" onClick={handleclick} name='F5' id='S30'>F5</Button>{' '}

                            </div>

                        </div>
                        <div className='seventh'>
                            <div className='primary'>
                                <Button variant="outline-success" onClick={handleclick} name='G1' id='S31'>G1</Button>{' '}
                                <Button variant="outline-success" onClick={handleclick} name='G2' id='S32'>G2</Button>{' '}
                                <Button variant="outline-success" onClick={handleclick} name='G3' id='S33'>G3</Button>{' '}




                            </div>
                            <div className='secondary'>
                                <Button variant="outline-success" onClick={handleclick} name='G4' id='S34'>G4</Button>{' '}
                                <Button variant="outline-success" onClick={handleclick} name='G5' id='S35'>G5</Button>{' '}

                            </div>

                        </div>
                        <div className='eight'>
                            <div className='primary'>
                                <Button variant="outline-success" onClick={handleclick} name='H1' id='S36'>H1</Button>{' '}
                                <Button variant="outline-success" onClick={handleclick} name='H2' id='S37'>H2</Button>{' '}
                                <Button variant="outline-success" onClick={handleclick} name='H3' id='S38'>H3</Button>{' '}




                            </div>
                            <div className='secondary'>
                                <Button variant="outline-success" onClick={handleclick} name='H4' id='S39'>H4</Button>{' '}
                                <Button variant="outline-success" onClick={handleclick} name='H5' id='S40'>H5</Button>{' '}

                            </div>

                        </div>
                        <div className='nineth'>
                            <div className='primary'>
                                <Button variant="outline-success" onClick={handleclick} name='I1' id='S41'>I1</Button>{' '}
                                <Button variant="outline-success" onClick={handleclick} name='I2' id='S42'>I2</Button>{' '}
                                <Button variant="outline-success" onClick={handleclick} name='I3' id='S43'>I3</Button>{' '}




                            </div>
                            <div className='secondary'>
                                <Button variant="outline-success" onClick={handleclick} name='I4' id='S44'>I4</Button>{' '}
                                <Button variant="outline-success" onClick={handleclick} name='I5' id='S45'>I5</Button>{' '}

                            </div>

                        </div>









                    </div>



                </Col>

                <Col lg={6} xl={6} >

                    <div>

                        <h2>Bus Details</h2>
                        <hr className='w-100' />
                        <div className='businfo' >
                            {bus ?
                                <><li>Bus Name: {bus.busname}</li>
                                    <li>Bus no: {bus.busno}</li>
                                    <li>From: {bus.from}</li>
                                    <li>To: {bus.to}</li>
                                    <li>Seat No: {sename}</li></>
                                : ""}

                        </div>
                        <hr />

                        <h2>Passenger Datails</h2>
                        <hr />
                        <div className='userinfo'>
                            {user ?
                                <>
                                    <li>Name: {user.sname}</li>
                                    <li>Email:{user.email}</li>
                                    <li>Gender: {user.gender}</li>
                                    <li>age: {age}</li>

                                </>
                                : ""}
                        </div>


                    </div>

                    <div>
                        <button className='book' onClick={handlebook}>Book Your Seat</button>
                    </div>





                </Col>
            </Row>



        </div>
    )
}

export default Buslayout