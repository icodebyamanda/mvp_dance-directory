import React, { useEffect, useState } from "react";

export default function RegistrationForm() {

  const [newInstructors, setNewInstructors] = useState([]);
  const [name, setName] = useState("");
  const [intro, setIntro] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");
  const [newEntryDisplay, setNewEntryDisplay] = useState(null);


  function handleSubmit(e) {
    e.preventDefault();
    addNewInstructor();
    displayLastEntry()
  };

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleIntroChange(e) {
    setIntro(e.target.value);
  };

  function handleEmailChange(e) {
    setEmail(e.target.value);
  };

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  };

  function handlePhotoChange(e) {
    setPhoto(e.target.value);
  };

 const displayLastEntry = () => {
    setNewEntryDisplay(name)
 }

  const addNewInstructor = () => {
    fetch("/instructors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name, intro, email, password, photo}),
    })
    .then(() => setNewInstructors(newInstructors))
    .catch((error) => { 
      return error;
    });
  };

  return (
    
    <div>

      <header className="Header">
        <h1 id="hOneAdmin">Welcome</h1>
        <p className="WelcomeText">To list your dance class, first, please register using this form:</p>
      </header>
      
      <body>

        <div className="Registrationform">

          <form onSubmit={handleSubmit}>

            <label>           
              <div className="InputLabel">Name:</div>
              <input 
              className="EnteredValues" 
              type="text" 
              name="instructor-name" 
              value={name} 
              onChange={handleNameChange}>
              </input>
            </label>
    ​
            <label>
              <div className="InputLabel"> Short introduction about yourself:</div>
              <input 
              className="EnteredValues" 
              type="text" 
              name="intro" 
              value={intro} 
              onChange={handleIntroChange}>
              </input>
            </label>

            <label>
            <div className="InputLabel"> Login email:</div>
              <input
                className="EnteredValues" 
                type="text"
                name="email"
                value={email}
                onChange={handleEmailChange}/>
            </label>

            <label>
            <div className="InputLabel"> Choose a password:</div>
              <input
                className="EnteredValues" 
                type="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}/>
            </label>

            <label>
            <div className="InputLabel"> Add a picture applying the following format: /yourname_350x350.jpg</div>
              <input
                className="EnteredValues" 
                type="text"
                name="photo"
                value={photo}
                onChange={handlePhotoChange}/>
            </label><br></br>
    ​
            <label>
              <input type="submit" value="submit" id="SubmitButton" />
            </label>

          </form>

        </div>

        <div className="NewEntryDisplay" > 

          { newEntryDisplay && (     
            <div>
              <div id="EntryAdded">Thank you for signing up {name} !</div>
              <div> To start using this directory, please log in here (WIP)</div>
            </div>
          )}
        </div>
      
      </body>

    </div>
  );
}
