import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import "./Buslayout.css"
import Button from 'react-bootstrap/Button';
import { useParams, useNavigate, Await } from 'react-router-dom';
import { bookapi, getbos } from './service/Allapi';
import { bookedContext, loginContext, pdfContext } from './usercontext/Contextshare';



import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';






function Buslayout() {


    const [sename, setname] = useState("");
    const [bus, setbus] = useState("");
    const [book, setbook] = useState({
        sename: "",
        name: "",
        email: "",
        gender: "",
        busname: "",
        busno: "",
        from: "",
        to: "",
        age: "",
        busid: "",
        ticket_no: ""
    });
    const [passenger, setpassenger] = useState({
        Name: "",
        Gender: "",
        Age: ""
    })
    const [touched, setTouched] = useState({
        Name: false,
        Gender: false,
        Age: false,
    });


    const handleBlur = (field) => (evt) => {
        setTouched({
            ...touched,
            [field]: true,
        });
    };

    const { bok, setbok } = useContext(pdfContext);
    const { booked, setbooked } = useContext(bookedContext);
    const { loginData, setloginData } = useContext(loginContext);
    const [age, setage] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem('login'));
    const [ticket, setticket] = useState("")

    const passengerdeatails = (e) => {
        let value = (e.target.value)
        let name = (e.target.name)

        setpassenger({ ...passenger, [name]: value })
    }
    console.log(passenger);


    const { Name, Gender, Age } = passenger

    console.log(Name, Gender, Age);




    const buss = async () => {
        const token = JSON.parse(localStorage.getItem('login'));
        const headers = {
            Authorization: `Bearer ${token.token}` // Use user.token directly here
        };

        try {
            const { data } = await getbos(id, headers);
            setbus(data);
        } catch (error) {
            console.error("Error fetching bus data:", error);
        }
    };

    const getRandomIntInclusive = () => {
        let min = Math.ceil(99);
        let max = Math.floor(999999);
        setticket(Math.floor(Math.random() * (max - min + 1)) + min);
    };

    const handleclick = event => {
        const name = event.target.name;
        setname(name);
    };

    const calculateAge = () => {
        if (user && user.userlo.dob) {
            const currentDate = new Date();
            const birthDate = new Date(user.userlo.dob);
            let age = currentDate.getFullYear() - birthDate.getFullYear();
            const monthDiff = currentDate.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
                age--;
            }
            setage(age);
        }
    };


    console.log(book);

    const handlebook = async (e) => {
        e.preventDefault();

        const {name,gender,age,sename}=book

        if(!name && !gender && !age && !sename){
            toast.warning("passenger details required")
        }
       
        else{




        const token = JSON.parse(localStorage.getItem('login'));
        const headers = {
            Authorization: `Bearer ${token.token}` // Use user.token directly here
        };
        console.log(headers);



        try {
            const responce = await bookapi(book, headers);

            if (responce.status === 200) {
                alert('Booking successful');
                setbok(book);
                console.log(responce.data);

                navigate('/ticket');
                setbook({
                    sename: "",
                    name: "",
                    email: "",
                    gender: "",
                    busname: "",
                    busno: "",
                    from: "",
                    to: "",
                    age: "",
                    busid: "",
                    ticket_no: ""
                });
            } else {
                alert("Something went wrong, please try again.");
            }
        } catch (err) {
            console.log("Booking error:", err);
        }
    };
}

    useEffect(() => {

        bus.seat?.map(i => {
            const btn = document.getElementsByName(i)[0]; // Assuming there's only one button with the given name
            if (btn) {
                btn.disabled = true;
                btn.style.backgroundColor = "gray";
            }
        });

        console.log("Bus data:", bus);
    }, [bus]);

    useEffect(() => {
        if (!user) {
            navigate("/");
        } else {
            buss();
            calculateAge();
            getRandomIntInclusive();
        }
    }, [age]);

    useEffect(() => {
        setbook({
            ...book,
            name: passenger ? passenger.Name || "" : "",
            gender: passenger ? passenger.Gender || "" : "",
            age: passenger ? passenger.Age || "" : "",
            email: user.userlo.email || "" ,
            busname: bus.busname || "",
            busno: bus.busno || "",
            from: bus.from || "",
            to: bus.to || "",
            price: bus.price || "",
            sename: sename,
            busid: bus._id || "",
            ticket_no: "ABT" + ticket
        });

    }, [sename]);




    return (
        <div>
            <h3>Seat No: {sename} </h3>
            <div>
                <Row className='w-100'>
                    <Col xs={12} lg={6} >





                        <div className='busbody'>
                            <div>
                                <img className='steering' src="https://i.postimg.cc/2jtjqCGx/pngtree-sports-car-steering-wheel-icon-flat-style-png-image-5254985.jpg" alt="" />
                            </div>

                            <div className='door'></div>
                            <div className='first '>
                                <div className='primary'>
                                    <Button variant="outline-success" onClick={handleclick} name='A1' id='S'>A1</Button>{' '}
                                    <Button variant="outline-success" onClick={handleclick} name='A2' id='S'>A2</Button>{' '}
                                    <Button variant="outline-success" onClick={handleclick} name='A3' id='S'>A3</Button>{' '}




                                </div>
                                <div className='secondary'>
                                    <Button variant="outline-success" onClick={handleclick} name='A4' id='S'>A4</Button>{' '}
                                    <Button variant="outline-success" onClick={handleclick} name='A5' id='S'>A5</Button>{' '}

                                </div>

                            </div>
                            <div className='second'>
                                <div className='primary'>
                                    <Button variant="outline-success" onClick={handleclick} name='B1' id='S'>B1</Button>{' '}
                                    <Button variant="outline-success" onClick={handleclick} name='B2' id='S'>B2</Button>{' '}
                                    <Button variant="outline-success" onClick={handleclick} name='B3' id='S'>B3</Button>{' '}




                                </div>
                                <div className='secondary'>
                                    <Button variant="outline-success" onClick={handleclick} name='B4' id='S'>B4</Button>{' '}
                                    <Button variant="outline-success" onClick={handleclick} name='B5' id='S'>B5</Button>{' '}

                                </div>

                            </div>
                            <div className='third'>
                                <div className='primary'>
                                    <Button variant="outline-success" onClick={handleclick} name='C1' id='S'>C1</Button>{' '}
                                    <Button variant="outline-success" onClick={handleclick} name='C2' id='S'>C2</Button>{' '}
                                    <Button variant="outline-success" onClick={handleclick} name='C3' id='S'>C3</Button>{' '}




                                </div>
                                <div className='secondary'>
                                    <Button variant="outline-success" onClick={handleclick} name='C4' id='S'>C4</Button>{' '}
                                    <Button variant="outline-success" onClick={handleclick} name='C5' id='S'>C5</Button>{' '}

                                </div>

                            </div>

                            <div className='forth'>
                                <div className='primary'>
                                    <Button variant="outline-success" onClick={handleclick} name='D1' id='S'>D1</Button>{' '}
                                    <Button variant="outline-success" onClick={handleclick} name='D2' id='S'>D2</Button>{' '}
                                    <Button variant="outline-success" onClick={handleclick} name='D3' id='S'>D3</Button>{' '}




                                </div>
                                <div className='secondary'>
                                    <Button variant="outline-success" onClick={handleclick} name='D4' id='S'>D4</Button>{' '}
                                    <Button variant="outline-success" onClick={handleclick} name='D5' id='S'>D5</Button>{' '}

                                </div>

                            </div>

                            <div className='fifth'>
                                <div className='primary'>
                                    <Button variant="outline-success" onClick={handleclick} name='E1' id='S'>E1</Button>{' '}
                                    <Button variant="outline-success" onClick={handleclick} name='E2' id='S'>E2</Button>{' '}
                                    <Button variant="outline-success" onClick={handleclick} name='E3' id='S'>E3</Button>{' '}




                                </div>
                                <div className='secondary'>
                                    <Button variant="outline-success" onClick={handleclick} name='E4' id='S'>E4</Button>{' '}
                                    <Button variant="outline-success" onClick={handleclick} name='E5' id='S'>E5</Button>{' '}

                                </div>

                            </div>

                            <div className='sixth'>
                                <div className='primary'>
                                    <Button variant="outline-success" onClick={handleclick} name='F1' id='S'>F1</Button>{' '}
                                    <Button variant="outline-success" onClick={handleclick} name='F2' id='S'>F2</Button>{' '}
                                    <Button variant="outline-success" onClick={handleclick} name='F3' id='S'>F3</Button>{' '}




                                </div>
                                <div className='secondary'>
                                    <Button variant="outline-success" onClick={handleclick} name='F4' id='S'>F4</Button>{' '}
                                    <Button variant="outline-success" onClick={handleclick} name='F5' id='S'>F5</Button>{' '}

                                </div>

                            </div>
                            <div className='seventh'>
                                <div className='primary'>
                                    <Button variant="outline-success" onClick={handleclick} name='G1' id='S'>G1</Button>{' '}
                                    <Button variant="outline-success" onClick={handleclick} name='G2' id='S'>G2</Button>{' '}
                                    <Button variant="outline-success" onClick={handleclick} name='G3' id='S'>G3</Button>{' '}




                                </div>
                                <div className='secondary'>
                                    <Button variant="outline-success" onClick={handleclick} name='G4' id='S'>G4</Button>{' '}
                                    <Button variant="outline-success" onClick={handleclick} name='G5' id='S'>G5</Button>{' '}

                                </div>

                            </div>
                            <div className='eight'>
                                <div className='primary'>
                                    <Button variant="outline-success" onClick={handleclick} name='H1' id='S'>H1</Button>{' '}
                                    <Button variant="outline-success" onClick={handleclick} name='H2' id='S'>H2</Button>{' '}
                                    <Button variant="outline-success" onClick={handleclick} name='H3' id='S'>H3</Button>{' '}




                                </div>
                                <div className='secondary'>
                                    <Button variant="outline-success" onClick={handleclick} name='H4' id='S'>H4</Button>{' '}
                                    <Button variant="outline-success" onClick={handleclick} name='H5' id='S'>H5</Button>{' '}

                                </div>

                            </div>
                            <div className='nineth'>
                                <div className='primary'>
                                    <Button variant="outline-success" onClick={handleclick} name='I1' id='S'>I1</Button>{' '}
                                    <Button variant="outline-success" onClick={handleclick} name='I2' id='S'>I2</Button>{' '}
                                    <Button variant="outline-success" onClick={handleclick} name='I3' id='S'>I3</Button>{' '}




                                </div>
                                <div className='secondary'>
                                    <Button variant="outline-success" onClick={handleclick} name='I4' id='S'>I4</Button>{' '}
                                    <Button variant="outline-success" onClick={handleclick} name='I5' id='S'>I5</Button>{' '}

                                </div>

                            </div>









                        </div>

                        <div className='container w ' style={{ display: "flex", justifyContent: "left", marginLeft: "23%" }}>
                            <div className='ms-2'>
                                <div style={{ width: "25px", height: "25px", backgroundColor: "gray" }} class="border border-success ms-4"></div>
                                <h5>Booked</h5>
                            </div>
                            <div className='ms-5'>
                                <div style={{ width: "25px", height: "25px", backgroundColor: "white" }} class="border border-success ms-4"></div>

                                <h5>Available</h5>
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
                                        <li>Seat No: {sename}</li>
                                    </>

                                    : ""}

                            </div>
                            <hr />

                            <h2>Passenger Datails</h2>
                            <hr />
                            {/* <div className='userinfo'>
                                {user ?
                                    <>
                                        <li>Name: {user.userlo.name}</li>
                                        <li>Email:{user.userlo.email}</li>
                                        <li>Gender: {user.userlo.gender}</li>
                                        <li>age: {age}</li>

                                    </>
                                    : ""}
                            </div> */}

                            <div className='container w-50'>
                                {touched.Name && !passenger.Name ? (
                                    <div className='text-warning' style={{ textAlign: 'left' }}>*Name required</div>
                                ) : ""}

                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Name"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        name='Name'
                                        required
                                        type="text"
                                        placeholder="name"
                                        onChange={passengerdeatails}
                                        onBlur={handleBlur('Name')}
                                    />

                                </FloatingLabel>
                                {touched.Gender && !passenger.Gender ? (
                                    <div className='text-warning' style={{ textAlign: 'left' }}>*Gender required</div>
                                ) : ""}
                                <Form.Select
                                    aria-label="Default select example"
                                    name='Gender'
                                    id='gender'
                                    onChange={passengerdeatails}
                                    onBlur={handleBlur('Gender')}
                                    className='mb-3'
                                    style={{ height: "60px" }}
                                >
                                    <option>Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </Form.Select>
                                {touched.Age && !passenger.Age ? (
                                    <div className='text-warning' style={{ textAlign: 'left' }}>*Age required</div>
                                ) : ""}

                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Age"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        name='Age'
                                        type="text"
                                        placeholder="name@example.com"
                                        onChange={passengerdeatails}
                                        onBlur={handleBlur('Age')}
                                    />
                                </FloatingLabel>

                            </div>

                        </div>

                        <div>
                            <button className='book' onClick={handlebook}>Book Your Seat</button>
                        </div>





                    </Col>
                </Row>
            </div>




        </div>
    )
}

export default Buslayout