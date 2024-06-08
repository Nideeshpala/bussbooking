import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getbos,getallbus, } from './service/Allapi'
import { Card, Col, Row } from 'react-bootstrap'
import './Buslites.css';
import { bookedContext } from './usercontext/Contextshare';
import Bussearch from './Bussearch';



function Buslistes() {

    const [search, setsearch] = useState("")
    const [from,setfrom]=useState("")
    const [date,setdate]=useState("")
    const [allbus, setallbus] = useState([])
    const {booked,setbooked}=useContext(bookedContext)

    const [Dtime,setDtime]=useState("")
    const [Atime,setAtime]=useState("")
   

    console.log(booked);

    // const user = JSON.parse(localStorage.getItem('login'))
    
  

    const navigate=useNavigate()
    
  
    const getbuses = async () => {

      try{
      const token = JSON.parse(localStorage.getItem('login')); // Fetch user data directly inside getbuses
      console.log(token.token);
      if (token) {
        const headers =  {
          Authorization: `Bearer ${token.token}` // Use user.token directly here
        };
        
        const response = await getallbus(headers);
        setallbus(response.data);
      } else {
        alert("invalid access")
        
      }
    }catch(err){
      alert(err)
      navigate('/');

    }
    };
   console.log(allbus);
 

   
    useEffect(() => {
  try{
    getbuses()
  }
  catch(err){
    alert("invalid access")
  }
       
          }, [])

   
  
  
  const [show, setShow] = useState(false);

//  const handleshow=()=>{

//   document.getElementById('lay').style.display="block"
//   document.getElementById('tr').style.display="none"
//  }
  return (
    <div>
  <Row className='w-100'>
    <Col lg={2}>
      
    </Col>

    <Col lg={10}>
<Bussearch></Bussearch>

    <div className='mt-4' >
      {allbus?.map((i) => (
            <div > 
              <Link style={{textDecoration:'none' }} to={`/seat/${i._id}`}>
                <div id='tr' className='whca ms-5' >
                <Card className="shadow-lg p-3  bg-body-tertiary rounded" style={{background:"linear-gradient(to right, rgb(237, 45, 215), rgb(74, 11, 222))"}}>
                  <h2 className='st ms-2' style={{textAlign:"left"}}>{i.busname}</h2>
                  <div className='container w-50' style={{display:'flex', justifyContent:'space-around'}}>
                    <h6 className='st'>{i.Atime}</h6>
                    <h4 className='st'>{i.Jdate}</h4>
                    <h6 className='st'>{i.Dtime}</h6>
                  </div>
                  <h5  className='mt-3 st' style={{color:'#ffffff'}}><i class="fa-sharp fa-solid fa-indian-rupee-sign "></i> {i.price}</h5>

                  <div className='st container w-50 mt-3' style={{display:'flex',justifyContent:'space-around'}}>
                    <h6 className='st'>{i.from}</h6>
                    <i className=' st fa-solid fa-arrow-right'></i>
                    <h6 className='st'>{i.to}</h6>
                  </div>

                 
                 
          
          <Card.Body>
            <Card.Text className='text-black'>
            <div className='ms-2 w-25' style={{display:'flex', justifyContent:'space-between'}}>
                  <i class="fa-solid fa-bottle-water" style={{color:'#ffffff'}}></i>
                  <i class="fa-solid fa-plug" style={{color:'#ffffff'}}></i>
                  <i class="fa-solid fa-lightbulb" style={{color:'#ffffff'}}></i>
                  <i class="fa-solid fa-book" style={{color:"#ffffff"}}></i>
                  </div>
             
            </Card.Text>
          </Card.Body>
        </Card>
        <br />
                  <hr style={{ marginLeft: "50px" }} />
                </div>
              </Link>
            </div>
          ))}
    </div>

    </Col>

    {/* <Col lg={6}>
      <div id='lay' style={{ display: "none" }}></div>
    </Col> */}
  </Row>
</div>
  )
}

export default Buslistes