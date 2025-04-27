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
  const [resp, setResp] = useState(null);

  const [loader, setLoader] = useState(null);
  useEffect(() => {
    axios.get('http://localhost:8080/note/lists')
      .then((response) => {
        setNotes(response.data.notes);
        
      })
      .catch((error) => {
        console.error("API call failed:", error);
      });
  }, []);


  function onClickTrash(id) {
    setLoader("loading"); // Show loader when delete is initiated
  
    axios.delete(`http://localhost:8080/note/list/${id}`)
      .then((response) => {
        console.log(response.data);
        setResp("deletesuccess"); // Show success message
        // Refetch notes after a short delay to show the loader and then fetch the updated list
        setTimeout(() => {
          axios.get('http://localhost:8080/note/lists')
            .then((response) => {
              setNotes(response.data.notes);

             setResp(null); // Hide loader after notes are refreshed
             setLoader(null); // Hide loader after notes are refreshed
           
            })
            .catch((error) => {
              console.error("Error refreshing notes:", error);
              setResp("deleteerror");
              setLoader(null); // Hide loader after notes are refreshed
           
            });
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        setResp("deleteerror"); // Show error message
        setTimeout(() => {
          setResp(null); // Hide loader after error
          setLoader(null); // Hide loader after notes are refreshed
           
        }, 2000);
      });
  
    console.log("Trash Clicked!!" + id);
  }
  

  function onClickEdit(id){
    console.log("Edit Clicked!!" + id);
    /*
     * For edit we have to focus on few things like;
        1. on click of edit screen we have redirect our page to note page and put the subject and body for the specific {id}
        2. Have to add a save changes button to save the changes.
        3. Functionality of save changes would be - i). to update the record in real time if record is already present in the db,
            ii). check if record is present if not, ask the user to add the note first.
        4. if record already exist give a pop up of "saved changes successfully!"
        5. after adding the note don't clear the subject and body directly, let's create a done button for that.
        6. Done button will redirect our user to home page.
     */
    // let subjectLine = document.querySelector(`[id="${id}"] .card-title`).innerText;
    // let body = document.querySelector(`[id="${id}"] .card-text`).innerHTML;
    
    window.location.href = `/Note/${id}`;

    // document.getElementById("ReferenceNoteId").textContent = id;
    // document.getElementById("subject").value = subjectLine;
    // document.getElementById("editor").innerHTML = body;

  }
  return (
    <>
    {loader === "loading" && (
      <div ><div className="background-overlay" id="overlay"></div>
      <div className="loader" id="loader"></div>
      </div>
    )}
    {resp === "deletesuccess" && (
      
        <div className="custom-alert success">✅ Note Deleted Successfully!</div>
      )}
      {resp === "deleteerror" && (
        <div className="custom-alert error">⚠️ Something went wrong while delete. <br/>Try again.</div>
      )}
      <div className="container">
        <header>
          <h1><i className="fas fa-home"></i> Home Page</h1>
        </header>
      </div>
      <hr/>
      <Row xs={1} md={3} className="g-4">
        {notes.map((note, idx) => (
            // {console.log(notes)}
          <Col id = {note.id} key={note.id}>
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
                {console.log(Card)}
              </Card.Body>
              <Card.Footer className="footerCard" ><i className="fas fa-pencil" onClick={()=> onClickEdit(note.id)}></i> 
              <i className="fas fa-trash" onClick={()=> {onClickTrash(note.id)}}></i> </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default HomePage;
