import React, {useState} from "react";
import axios from "axios";

export default function InstructorsLogin(props) {
  
  const [instructor, setInstructor] = useState({email: "", password:""}) // hardcode a preexisting instructor to test
 

  const handleChange = (e) => {
    setInstructor((state) => ({...state, [e.target.name]: e.target.value}));
  };

  const login = () => {
    axios
    .post("/users/login", { // change url?
      data: instructor,
    })
      .then(result => {
        //store it locally
        localStorage.setItem("token", result.data.token);
        console.log(result.data.message, result.data.token);
      })
      .catch(error => console.log(error));
  };

  requestData = () => {
    axios("/users/profile", { // change url
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(result => console.log(result.data.message))
      .catch(error => console.log(error));
  };


    return (
      <div>
        <div>
          <input
            value={state.email}
            onChange={handleChange}
            name="email"
            type="text"
            className="form-control mb-2"
          />
          <input
            value={state.password}
            onChange={handleChange}
            name="password"
            type="password"
            className="form-control mb-2"
          />
          <button className=" btn btn-primary" onClick={login}>
            Log in
          </button>
        </div>
        <div className="text-center p-4">
          <button
            className=" btn btn-outline-primary"
            onClick={requestData}
          >
            Request protected data
          </button>
        </div>
      </div>
    );
}

//  
