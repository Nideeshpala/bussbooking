import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './Header.css'
import { loginContext, registerContext } from './usercontext/Contextshare';
import { Alert, AlertHeading, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal';
import { cancelticket, selticket } from './service/Allapi';


function Header() {

  const [show, setShow] = useState(false);
  const [tcan, settcan] = useState("");
  const { loginData, setloginData } = useContext(loginContext);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const retuserdata = JSON.parse(localStorage.getItem('login'));
  const bud = JSON.parse(localStorage.getItem('bus'));

  console.log(retuserdata);

  const handlesubmit = async (e) => {
    e.preventDefault();
    localStorage.removeItem('login');
    localStorage.removeItem('bus');
    navigate("/");
  }

  const handlecancel = async (e) => {
    e.preventDefault();
    const { ticket_no, email } = tcan;
    console.log(ticket_no, email);

    if (!ticket_no) {
      toast.warning("Ticket number required");
    } else if (!email) {
      toast.warning("Email required");
    } else {
      const token = JSON.parse(localStorage.getItem('login'));
      console.log(token.token);
      if (token) {
        const header = {
          Authorization: `Bearer ${token.token}`
        };
        const response = await cancelticket(tcan, header);

        if (response.status === 200) {
          console.log(response.data);
          toast.success("Ticket Canceled Successfully");
          handleClose(); // Close the modal after successful cancellation
          navigate("/");
        }
      }
    }
  }

  const cancell = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    settcan({ ...tcan, [name]: value });
  }

  console.log(tcan);





  // selected ticket
  

//   const ticketselection = async (e) => {
//     e.preventDefault();

//     const token = JSON.parse(localStorage.getItem('login'));
    
//     if (!token || !token.token || !token.userlo || !token.userlo._id || !token.userlo.ticket) {
//         alert("Invalid access");
//         return;
//     }

//     const headers = {
//         Authorization: `Bearer ${token.token}`
//     };

//     // Assuming ticket_no is a property you need to get, ensure it's obtained correctly
//     const ticket_no = token.userlo.ticket.ticket[ticket_no]; // Replace 'someTicketProperty' with the actual property name
//     const id = token.userlo._id;
    
//     console.log(ticket_no, id);

//     // try {
//         const { data } = await selticket({ ticket_no, id }, headers);
//         console.log(data);
//     // } catch (err) {
//     //     console.error("Error fetching ticket:", err);
//     //     alert("User not logged in");
//     //     navigate('/');
//     // }
// };

useEffect(()=>{
  
},[])




  return (
    <div className='sticky-top'>
      <Navbar className="bg-body-tertiary "  style={{ background: "linear-gradient(to right, rgb(237, 45, 215), rgb(74, 11, 222))"}} >
        <Container>
          <Navbar.Brand href="#home" id='bs'>AirBus</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <div className="btn-group">
                <button className='btn btn-light ' style={{color:'rgb(0, 153, 247)', fontWeight:'bold'}}>
                  <i className='fa-regular fa-circle-user fa-lg  ' style={{color:'rgb(0, 153, 247)'}}></i>
                  {retuserdata ? retuserdata.userlo.name : "Account"}
                </button>
                <button type="button" className="btn btn-light dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                  <span className="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" onClick={handleShow} href="#">Cancel Ticket</a></li>
                  <li><a className="dropdown-item"  href="viewticket">Show My Ticket</a></li>
                  <li><a className="dropdown-item" href="/">Login/Sign up</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>{retuserdata ? <a className="dropdown-item" onClick={handlesubmit} href="#">Logout</a> : ""}</li>
                </ul>
              </div>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ticket Canceling Application</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="inputlo form-floating mb-3">
            <input type="text" className="form-control" id="floatingInput" name="ticket_no" onChange={cancell} required placeholder="Ticket no" />
            <label htmlFor="floatingInput">Ticket no</label>
          </div>
          <div className="inputlo form-floating">
            <input type="text" className="form-control" name="email" onChange={cancell} required id="floatingPassword" placeholder="Email" />
            <label htmlFor="floatingPassword">Email</label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handlecancel}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-center" theme="colored" />
    </div>






  )
}

export default Header