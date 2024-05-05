import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getbos,getallbus, } from './service/Allapi'
import { Card, Col, Row } from 'react-bootstrap'
import './Buslites.css';


function Buslistes() {

    const [search, setsearch] = useState("")
    const [from,setfrom]=useState("")
    const [date,setdate]=useState("")
    const [allbus, setallbus] = useState([])
    
    const { id } = useParams()

    const navigate=useNavigate()
    
  
    const getbuses = async () => {
      const response = await getallbus()
   setallbus(response.data);
  
    }
    console.log(allbus);
  
    
   
   
    

   
    useEffect(() => {
    

      if(localStorage.sname==""){
        navigate("/")
      }
      else{
         getbuses()
      }
   
      


    }, [search])

   
  
  
  const [show, setShow] = useState(false);

 const handleshow=()=>{

  document.getElementById('lay').style.display="block"
  document.getElementById('tr').style.display="none"
 }
  return (
    <div>

<Row className='w-100'>
        <Col lg={6}>


          <div className='list'>
            <div>
              <h3>Buslist</h3>
              <div className='selection'>
                <div class="inputre form-floating mb-3">
                <select class="form-select " onChange={e => setfrom(e.target.value)} aria-label="Default select example" >
                    <option selected>From</option>
                    <option value="1">Chennai</option>
                  </select>
                </div>
                <div class="inputre form-floating mb-3">
                  <select class="form-select " onChange={e => setsearch(e.target.value)}  aria-label="Default select example" >
                    <option selected >To</option>
                    <option value="1">banglure</option>
                    <option value="2">Trivandrum</option>
                    <option value="3">Hydrabad</option>
                  </select>
                </div>

                <div class="inputre form-floating mb-3">
                  <input type="date" class="form-control" name='to' onChange={e => setdate(e.target.value)} required id="to" placeholder="Name"></input>
                  <label for="Destination">Date</label>
                </div>
              </div>


            </div>
            
          
        
           {allbus?.map(i=>(
                 <div>
                     <Link to={`/seat/${i._id}}`}>
                      <div id='tr' className='whca ms-5'  onClick={handleshow}>
                         <Card className='b mb-3'>
                      <Card.Img className='busimg' variant="top" src="https:/i.postimg.cc/vTNR8bzw/istockphoto-860696690-2048x2048.jpg" />
                      <Card.Body>
                        <Card.Text>
                         <div className='busdetails'>
                           <div>*Busname:{i.busname}</div>
                           <div>*Starts From:{i.from}</div>
                           <div>*To:{i.to}</div>
                           <div>*Departure Time:{i.Dtime}</div>
                         </div>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    <hr style={{marginLeft:"50px"}} />
                   
                      </div>
                
                
             </Link>
                 </div>
                 ))}
          
        
    
           
          </div>
        </Col>

        <Col lg={6}>

          <div id='lay' style={{display:"none"}}></div>
        </Col>
      </Row>
    </div>
  )
}

export default Buslistes