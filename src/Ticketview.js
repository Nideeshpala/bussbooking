import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Document, Page, Text, View, PDFDownloadLink } from '@react-pdf/renderer';
import { pdfContext} from './usercontext/Contextshare';
import { ticketgen } from './service/Allapi';
import { useNavigate } from 'react-router-dom';


const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  info: {
    marginBottom: 10,
  },
});

const navigate = useNavigate




const BusTicketPDF = ({ ticketData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Bus Ticket</Text>
        <View style={styles.info}>
          <Text>Name: {ticketData.name}</Text>
          <Text>Email: {ticketData.email}</Text>
          <Text>From: {ticketData.from}</Text>
          <Text>To: {ticketData.to}</Text>
          <Text>Seat No: {ticketData.sename}</Text>
          <Text>Ticket No: {ticketData.ticket_no}</Text>
        </View>
        <Text style={{ textAlign: 'center' }}>Thank you for choosing our bus service!</Text>
      </View>
    </Page>
  </Document>
);

const TicketPage = () => {
  const { bok,setbok } = useContext(pdfContext);



  const getticket = async () => {
    const token = JSON.parse(localStorage.getItem('login'));
    const headers =  {
        Authorization: `Bearer ${token.token}` // Use user.token directly here
      };
  
  
    try {
      
   
  
      if (!token || !token.token || !token.userlo || !token.userlo._id) {
        alert("Invalid access");
        return;
      }
  
      const id = token.userlo._id;
      console.log(id);
  
      const {data} = await ticketgen({id}, headers);
      setbok(data);
    } catch (err) {
      console.error('Error fetching ticket:', err);
      alert("User not logged in");
      navigate('/');
    }
  };
 



  

  useEffect(() => {
    getticket()
    console.log("ticket:",bok);
  }, []);



  return (
    <div>
      <h1>Bus Ticket</h1>
      <div style={{ textAlign: 'left' }}>
        <h3>Name: {bok.name}</h3>
        <h3>Email: {bok.email}</h3>
        <h3>From: {bok.from}</h3>
        <h3>To: {bok.to}</h3>
        <h3>Seat No: {bok.sename}</h3>
        <h3>Ticket No: {bok.ticket_no}</h3>
      </div>

      <PDFDownloadLink document={<BusTicketPDF ticketData={bok} />} fileName="ticket.pdf">
        {({ loading }) => (loading ? 'Loading document...' : 'Download Ticket')}
      </PDFDownloadLink>
    </div>
  );
};

export default TicketPage;
