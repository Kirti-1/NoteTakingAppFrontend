import './../Styles/styles.css'

import { useEffect, useState } from 'react';
import axios from 'axios';

function execCmd(command) {
  if (command === 'insertImage') {
    const url = prompt("Enter image URL");
    if (url) document.execCommand('insertImage', false, url);
  } else {
    document.execCommand(command, false, null);
  }
}

function NotePage() {
  const [apiStatus, setApiStatus] = useState(null);

  const quotes = [
    "✨ Believe in yourself and all that you are.",
    "✨ Every day is a fresh start.",
    "✨ Write your heart out, it’s your safe space.",
    "✨ Your words matter. Let them out.",
    "✨ Little notes lead to big clarity."
  ];

  useEffect(() => {
    if (apiStatus) {
      // document.getElementById("subject").value = '';
      // document.getElementById("editor").innerHTML = '';
      
    }
  }, [apiStatus]);

  useEffect(() => {
    document.getElementById("subject").value = '';
    document.getElementById("editor").innerHTML = '';
    const quoteBox = document.getElementById("quote");
    if (!quoteBox) return; // Graceful early exit if element is missing
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteBox.textContent = randomQuote || '';
  }, []);

  function addNote() {
    let subjectLine = document.getElementById("subject").value;
    let body = document.getElementById("editor").innerHTML;
    console.log(subjectLine);
    console.log(body);
    // first check if the note is already added using the referencenoteid, if yes don't re-run the below api, else present a warning to note already added save your changes.
    // Here you would make the API call, e.g., with axios

    var idExists = document.getElementById("ReferenceNoteId").innerText;
    if(isNaN(parseInt(idExists))){

    axios.post('http://localhost:8080/note/add', { subjectLine, body, createdBy: "Kirti Arora" })
      .then((response) => { 
        console.log("response"+JSON.stringify(response));
        if(response.data.result){
          setApiStatus(response.data.result);

          //Added note Id to the hidden element, reference this when clicked on saved and done button!
          document.getElementById("ReferenceNoteId").innerText = response.data.notes[0].id;
        }else{
          setApiStatus("error");
        }
        })
      .catch((error) => { setApiStatus("error"); });
      }else{
        setApiStatus("notealreadyadded");
      }
    // Simulate Hardcoded success for testing
    // setApiStatus("success");
    // reset the api status to be able to show the status again.
    setTimeout(()=>setApiStatus(null), 1000);
  }

function SaveNote(){
   // Simulate Hardcoded success for testing
    // setApiStatus("savedsuccess");
    // reset the api status to be able to show the status again.
    var idExists = document.getElementById("ReferenceNoteId").innerText;
    if(!isNaN(parseInt(idExists))){
      //run update api 
      let subjectLine = document.getElementById("subject").value;
      let body = document.getElementById("editor").innerHTML;
      axios.put('http://localhost:8080/note/list/'+idExists, { id : idExists, subjectLine, body})
      .then((response) => { 
        console.log("response"+JSON.stringify(response));
        if(response.data.result){
          setApiStatus("savedsuccess");
        }else{
          setApiStatus("error");
        }
        })
      .catch((error) => { 
        console.log(error);
        setApiStatus("error"); });




      //stimulate the savedsuccess message for testing purpose.
      // setApiStatus("savedsuccess");
    }else{
      setApiStatus("noteaddwarning");
    }
    setTimeout(()=>setApiStatus(null), 1000);
}
function doneNote(){
  /*add a loader along with pop up saying redirecting to home page & update the note for id if id exist otherwise show error
  show Note not added, are you sure you want to continue, - have two buttons cancel and ok.
  on "Ok" - redirect to home page without adding the note
  on "Cancel" - don't  do anything stay on the same page.
  */ 
  console.log("clicked on Done note!!");
}

  return (
    <>
     {apiStatus === "success" && (
        <div className="custom-alert success">✅ Note Added Successfully!</div>
      )}
      {apiStatus === "error" && (
        <div className="custom-alert error">⚠️ Something went wrong. Try again.</div>
      )}
      {apiStatus === "savedsuccess" && (
        <div className="custom-alert success">✅ Note Saved Successfully!</div>
      )}
      {apiStatus === "noteaddwarning" && (
        <div className="custom-alert warning">⚠️ Add the Note First!</div>
      )}
      {apiStatus === "notealreadyadded" && (
        <div className="custom-alert warning">⚠️ Note Already added, <br/> please save your changes!</div>
      )}
      
    <div style={{textAlign:'right'}}><button className="add-note" onClick={() => doneNote()}>
              <i className="fas fa-check"></i>  Done
            </button></div>
      <div className="container">
        <header>
          <h1><i className="fas fa-book-open"></i> My Diary</h1>
          
        </header>
    

        <div className="form-section">
          <input type="text" id="subject" placeholder="📝 Subject line of your diary..." />
          <p id="ReferenceNoteId" style={{display:'none'}}></p>
          <div className="toolbar">
            <button onClick={() => execCmd('bold')} title="Bold"><i className="fas fa-bold"></i></button>
            <button onClick={() => execCmd('italic')} title="Italic"><i className="fas fa-italic"></i></button>
            <button onClick={() => execCmd('underline')} title="Underline"><i className="fas fa-underline"></i></button>
            <button onClick={() => execCmd('strikeThrough')} title="Strikethrough"><i className="fas fa-strikethrough"></i></button>
            <button onClick={() => execCmd('insertOrderedList')} title="Numbered List"><i className="fas fa-list-ol"></i></button>
            <button onClick={() => execCmd('insertUnorderedList')} title="Bulleted List"><i className="fas fa-list-ul"></i></button>
            <button onClick={() => execCmd('justifyLeft')} title="Align Left"><i className="fas fa-align-left"></i></button>
            <button onClick={() => execCmd('justifyCenter')} title="Align Center"><i className="fas fa-align-center"></i></button>
            <button onClick={() => execCmd('justifyRight')} title="Align Right"><i className="fas fa-align-right"></i></button>
            <button onClick={() => execCmd('justifyFull')} title="Justify"><i className="fas fa-align-justify"></i></button>
            <button onClick={() => execCmd('createLink')} title="Insert Link"><i className="fas fa-link"></i></button>
            <button onClick={() => execCmd('unlink')} title="Remove Link"><i className="fas fa-unlink"></i></button>
            <button onClick={() => execCmd('insertImage')} title="Insert Image"><i className="fas fa-image"></i></button>
            <button onClick={() => execCmd('foreColor')} title="Text Color"><i className="fas fa-palette"></i></button>
            <button onClick={() => execCmd('hiliteColor')} title="Highlight"><i className="fas fa-highlighter"></i></button>
            <button onClick={() => execCmd('removeFormat')} title="Remove Formatting"><i className="fas fa-eraser"></i></button>
          </div>

          <div id="editor" contentEditable="true" placeholder="💭 Write your thoughts here..."></div>

          <div id="quote" className="motivational-quote">✨ “Every moment is a fresh beginning.” – T.S. Eliot</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

            {/* after adding the note don't clear the content!
                1. add a pop up saying click on Done to view your note.
                2. store the id in {ReferenceNoteId} innertext for save changes and done to reference.
            */}
            <button className="add-note" onClick={() => addNote()}>
              <i className="fas fa-plus"></i> Add Note
            </button>
            {/* disable the save button till note is not added manually. */}
            <button className="save-note" onClick={() => SaveNote()}>
              <i className="fas fa-check"></i>  Save Note
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default NotePage;
