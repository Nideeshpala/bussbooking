import React, { useEffect, useState } from 'react'
import { getallbus } from './service/Allapi';
import { useNavigate } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';







function Bussearch() {

  const [allbus, setallbus] = useState([])

  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [date, setDate] = useState("")
  const [filteredBuses, setFilteredBuses] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault()
    const results = allbus.filter(
      bus => bus.from.toLowerCase() === from.toLowerCase() && bus.to.toLowerCase() === to.toLowerCase()
        


    );
    setFilteredBuses(results);
  
  };
  console.log(filteredBuses);


  const navigate = useNavigate()

  const getbuses = async () => {

    try {
      const token = JSON.parse(localStorage.getItem('login')); // Fetch user data directly inside getbuses
      console.log(token.token);
      if (token) {
        const headers = {
          Authorization: `Bearer ${token.token}` // Use user.token directly here
        };

        const response = await getallbus(headers);
        setallbus(response.data);
      } else {
        alert("invalid access")

      }
    } catch (err) {
      alert(err)
      navigate('/');

    }
  };
  console.log(allbus);

  useEffect(() => {
    getbuses()
  }, [])








  return (
    <div >
       <div style={{display:'flex',justifyContent:'space-evenly'}} className='mt-5 container w-75 shadow-lg p-3 mb-5 bg-body-tertiary rounded'>
         <FloatingLabel
          controlId="floatingInput"
          label="From"
          className="mb-3"
          name='from'
          onChange={(e) => setFrom(e.target.value)}
          value='from'
        >
          <Form.Control type="text" placeholder='from' />
        </FloatingLabel>
        <FloatingLabel  onChange={(e) => setTo(e.target.value)} value='to' name='to' className='mb-3' controlId="floatingPassword" label="To" >
          <Form.Control type="text"  placeholder='to'/>
        </FloatingLabel>
        <FloatingLabel  onChange={(e) => setDate(e.target.value)} value='date' name='date' className='mb-3' controlId="floatingPassword" label="Date">
          <Form.Control type="date" placeholder='date'/>
        </FloatingLabel>
        <Button type='submit' onClick={handleSearch} variant="primary">Search</Button>
       </div>
      
     
    </div>
  )
}

export default Bussearch