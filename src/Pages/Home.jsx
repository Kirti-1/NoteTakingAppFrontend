import { useEffect } from 'react';
import './../Styles/styles.css';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import {useState} from 'react';
import coverPic from './../assets/cover_pic.png';

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
      <Row xs={1} md={3} className="g-4">
        {notes.map((note, idx) => (
            // {console.log(notes)}
          <Col key={idx}>
            <Card>
              <Card.Img variant="top" width="100" height="200" src={coverPic} />
              <Card.Body>
                <Card.Title>{note.subjectLine}</Card.Title>
                {/* React escapes HTML inside curly braces by default to prevent XSS attacks, 
                so you're seeing <b>bold</b> (as text), not bolded output.
                Only use this if you're sure the HTML is safe (e.g., 
                it's sanitized or from a trusted source). Otherwise, it can expose your app to security risks.
                 */}
                <Card.Text dangerouslySetInnerHTML={{ __html: note.body }} />

                {/* <Card.Text>
                 {note.body}
                </Card.Text> */}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default HomePage;
