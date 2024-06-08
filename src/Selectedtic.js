import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { selectedticketContext } from './usercontext/Contextshare';
import { StyleSheet, Document, Page, Text, View, PDFDownloadLink } from '@react-pdf/renderer';




function Selectedtic() {

  const navigate=useNavigate()

  const{selectedticketdetails}=useContext(selectedticketContext)

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

  const BusTicketPDF = ({ ticketData }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Bus Ticket</Text>
          <View style={styles.info}>
            <Text>Name:{ticketData.name}</Text>
            <Text>Age:{ticketData.age}</Text>
            <Text>Gender:{ticketData.gender}</Text>
            <Text>From:{ticketData.from}</Text>
            <Text>To:{ticketData.to}</Text>
            <Text>Seat_Number:{ticketData.sename}</Text>
            <Text>Ticket_Number:{ticketData.ticket_no}</Text>

          </View>
          <Text style={{ textAlign: 'center' }}>Thank you for choosing our bus service!</Text>
        </View>
      </Page>
    </Document>
  );
  
 

  


  useEffect(()=>{
    console.log(selectedticketdetails);
    
  },[])

  


  



    
  return (
    <div>
      <h1>Bus Ticket</h1>
      <div style={{ textAlign: 'left' }}>
        <h3>Name: {selectedticketdetails.name}</h3>
        <h3>Email: {selectedticketdetails.email}</h3>
        <h3>From: {selectedticketdetails.from}</h3>
        <h3>To: {selectedticketdetails.to}</h3>
        <h3>Seat No: {selectedticketdetails.sename}</h3>
        <h3>Ticket No: {selectedticketdetails.ticket_no}</h3>

      </div>

      <PDFDownloadLink document={<BusTicketPDF ticketData={selectedticketdetails} />} fileName="ticket.pdf">
        {({ loading }) => (loading ? 'Loading document...' : 'Download Ticket')}
      </PDFDownloadLink>
       

    </div>
  )
}

export default Selectedtic