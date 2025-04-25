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
      document.getElementById("subject").value = '';
      document.getElementById("editor").innerHTML = '';
      
    }
  }, [apiStatus]);

  useEffect(() => {
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
    // Here you would make the API call, e.g., with axios
    axios.post('http://localhost:8080/note/add', { subjectLine, body, createdBy: "Kirti Arora" })
      .then((response) => { setApiStatus("success"); })
      .catch((error) => { setApiStatus("error"); });

    // Simulate Hardcoded success for testing
    // setApiStatus("success");
    // reset the api status to be able to show the status again.
    setTimeout(()=>setApiStatus(null), 1000);
  }

  return (
    <>
     {apiStatus === "success" && (
        <div className="custom-alert success">✅ Note Added Successfully!</div>
      )}
      {apiStatus === "error" && (
        <div className="custom-alert error">⚠️ Something went wrong. Try again.</div>
      )}

      <div className="container">
        <header>
          <h1><i className="fas fa-book-open"></i> My Diary</h1>
        </header>

        <div className="form-section">
          <input type="text" id="subject" placeholder="📝 Subject line of your diary..." />

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

          <button className="add-note" onClick={addNote}><i className="fas fa-plus"></i> Add Note</button>
        </div>
      </div>
    </>
  );
}

export default NotePage;
