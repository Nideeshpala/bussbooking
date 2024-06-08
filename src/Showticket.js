import React, { useContext, useEffect, useState } from 'react'
import { selticket, tableticket, } from './service/Allapi';
import { Link, useNavigate } from 'react-router-dom';
import Selectedtic from './Selectedtic';
import { loginContext, selectedticketContext } from './usercontext/Contextshare';
import { Button } from 'react-bootstrap';


function Showticket() {

    const navigate = useNavigate();
    const [tic, settic] = useState([]);
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);
    const [selectedRowDetails, setSelectedRowDetails] = useState(null);
    const { loginData } = useContext(loginContext);
    const { selectedticketdetails, setselectedticketdetails } = useContext(selectedticketContext)


    const ticketlist = async () => {
        const token = JSON.parse(localStorage.getItem('login'))
        const headers = {
            Authorization: `Bearer ${token.token}`
        };

        try {
            if (!token || !token.token || !token.userlo || !token.userlo._id) {
                alert("Invalid access");
                return;
            }

            const id = token.userlo._id;
            const { data } = await tableticket({ id }, headers);
            settic(data);
        } catch (err) {
            console.error('Error fetching ticket:', err);
            navigate('/');
        }
    };

    useEffect(() => {
        ticketlist();
    }, []);

    const handleRowClick = (index, details) => {
        // setSelectedRowIndex(index);
       setselectedticketdetails(details);
       console.log(selectedticketdetails);
       
        // console.log('Selected row details:', selectedticketdetails);
        // You can add additional logic here if needed
    };

    



    return (
        <div>
            <h2>Ticket List</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Slno</th>
                        <th scope='col'>Bus_No</th>
                        <th scope="col">From</th>
                        <th scope="col">To</th>
                        <th scope="col">Seat no</th>
                        <th scope='col'>Ticket_No</th>
                        <th scope='col'>Price</th>
                        <th scope='col'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tic?.length > 0 ? tic.map((i, index) => (
                        <tr key={index} onClick={() => handleRowClick(index, i)}>
                            <td>{index + 1}</td>
                            <td>{i.busno}</td>
                            <td>{i.from}</td>
                            <td>{i.to}</td>
                            <td>{i.sename}</td>
                            <td>{i.ticket_no}</td>
                            <td>{i.price}</td>
                            <td><Link type='submit' to={`/seltic/${i.ticket_no}`}>Download Ticket</Link></td>
                        </tr>
                    )) : ""}
                </tbody>
            </table>

        </div>
    )
}

export default Showticket