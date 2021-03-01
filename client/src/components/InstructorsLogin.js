import React, {useState} from "react";
import axios from "axios";

export default function InstructorsLogin(props) {
  
  const [instructor, setInstructor] = useState({username: "", password:""}) 
 

  const handleChange = (e) => {
    e.persist();
    setInstructor((state) => ({...state, [e.target.name]: e.target.value}));
  };

  const login = () => {
    axios
      .post("/login", instructor) 
      .then(result => {
        //store it locally
        localStorage.setItem("token", result.data.token);
        console.log(result.data.message, result.data.token);
      })
      .catch(error => console.log(error));
  };

  const requestData = () => {
    axios("/login", {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((result) => console.log(result.data.message))
      .catch((error) => console.log(error));
  };


    return (
      <div>
        <div>

          <label>
            <div className="InputLabel"> Email </div>
            <input
              value={instructor.username}
              onChange={handleChange}
              name="username"
              type="text"
              className="form-control mb-2"
            />
          </label>

          <label>
            <div className="InputLabel"> Password </div>
            <input
              value={instructor.password}
              onChange={handleChange}
              name="password"
              type="password"
              className="form-control mb-2"
            />
          </label>
          
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
