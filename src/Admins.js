import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addbus } from './service/Allapi';



function Admins() {

    const [add, setadd] = useState(
        {
            busname: "",
            busno: "",
            from: "",
            to: "",
            Dtime: "",
            Atime: "",
            Jdate: "",
            capacity: "",
            price: ""
           

        }
    )

    const [error,seterror]=useState("")

    const adminadd = (e) => {
        let value = (e.target.value)
        let name = (e.target.name)

        setadd({ ...add, [name]: value })


    }
    console.log(add);

    const handlesubmit =async (e)=>{
        e.preventDefault()

        const {busname,busno,from,to,Dtime,Atime,Jdate,capacity,price}=add
        
        if(busname==""){
            toast.warning("Bus name required")
        }
        else if(busno==""){
            toast.warning("Bus no required")

        }
        else if(from==""){
            toast.warning("From required")

        }
        else if(to==""){
            toast.warning("to required")

        }
        else if(Dtime==""){
            toast.warning("Departure time required")

        }
        else if(Atime==""){
            toast.warning("Arrival time required")

        }
        else if(Jdate==""){
            toast.warning("Journey Date required")

        }
        else if(capacity==""){
            toast.warning("Capacity required")

        }
        else if(price==""){
            toast.warning("Price required")

        }
        else{
            const response=await addbus(add)
           
            if(response.status==200){
                alert("bus added successfully")
                setadd({
                    ...add,
                    busname:"",
                    busno:"",
                    from:"",
                    to:"",
                    Dtime:"",
                    Atime:"",
                    Jdate:"",
                    capacity:"",
                    price:""
                })
            }
            else{
            seterror(response.response.data)
            alert(error);

        }
        }
    
        
    }
  


    return (

        <Row>
            <Col lg={6}>
                <div className=''>

                    <div class="inputlo form-floating mb-3">
                        <input type="text" class="form-control" id="floatingInput" name='busname' onChange={adminadd} required placeholder="name@example.com"></input>
                        <label for="floatingInput">Busname</label>
                    </div>
                    <div class="inputlo form-floating">
                        <input type="text" class="form-control" name='busno' onChange={adminadd} required id="floatingPassword" placeholder="Password"></input>
                        <label for="floatingPassword">BusNumber</label>
                    </div>
                    <div class="inputlo form-floating mb-3">
                        <input type="text" class="form-control" id="floatingInput" onChange={adminadd} name='from' required placeholder="name@example.com"></input>
                        <label for="floatingInput">From</label>
                    </div>
                    <div class="inputlo form-floating">
                        <input type="text" class="form-control" name='to' onChange={adminadd} required id="floatingPassword" placeholder="Password"></input>
                        <label for="floatingPassword">To</label>
                    </div>
                    <div class="inputlo form-floating mb-3">
                        <input type="time" class="form-control" id="floatingInput" name='Dtime' onChange={adminadd} required placeholder="name@example.com"></input>
                        <label for="floatingInput">departure</label>
                    </div>
                    <div class="inputlo form-floating">
                        <input type="time" class="form-control" name='Atime' onChange={adminadd} required id="floatingPassword" placeholder="Password"></input>
                        <label for="floatingPassword">Arrival</label>
                    </div>
                    <div class="inputlo form-floating mb-3">
                        <input type="date" class="form-control" id="floatingInput" name='Jdate' onChange={adminadd} required placeholder="name@example.com"></input>
                        <label for="floatingInput">Journey data</label>
                    </div>
                    <div class="inputlo form-floating">
                        <input type="text" class="form-control" name='capacity' onChange={adminadd} required id="floatingPassword" placeholder="Password"></input>
                        <label for="floatingPassword">Capacity</label>

                    </div>
                    <div class="inputlo form-floating mb-3">
                        <input type="text" class="form-control" id="floatingInput" name='price' onChange={adminadd} required placeholder="name@example.com"></input>
                        <label for="floatingInput">price</label>
                    </div>
                  

                    <button onClick={handlesubmit} >Add bus</button>

                </div>
            </Col>
            <ToastContainer position="top-center" theme="colored" />

        </Row>
         
    )
}

export default Admins