import { useEffect } from 'react';
import './../Styles/styles.css';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import {useState} from 'react';

function HomePage() {
  const [notes, setNotes] =  useState([]) 
  useEffect(() => {
    axios.get('http://localhost:8080/note/lists')
      .then((response) => {
        setNotes(response.data.notes);
        
      })
      .catch((error) => {
        console.error("API call failed:", error);
      });
  }, []);

  return (
    <>
      <div className="container">
        <header>
          <h1><i className="fas fa-home"></i> Home Page</h1>
        </header>
      </div>
      <hr/>
      <Row xs={1} md={2} className="g-4">
        {notes.map((note, idx) => (
            // {console.log(notes)}
          <Col key={idx}>
            <Card>
              <Card.Img variant="top" src="holder.js/100px160" />
              <Card.Body>
                <Card.Title>{note.subjectLine}</Card.Title>
                <Card.Text>
                 {note.body}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default HomePage;
