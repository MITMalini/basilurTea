import { useState } from "react";
import axios from "axios";
import "./style.css";

import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setuserType] = useState(false);
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/user/login", {
        username,
        password,
        userType,
      })
      .then((result) => {
        if (result.status === 200) {
          console.log("login success");
          console.log(result.data);
          const id = result.data["user"][0]["_id"];
          if (userType === "admin") {
            history(`/Basilur/adminhome/${id}/true`);
          }
          if (userType === "user") {
            history(`/Basilur/home/${id}/true`);
          }
        } else {
          alert("Login failed,Try Again");
        }
      })
      .catch((Err) => {
        console.log(`login failed ${Err}`);
        alert("Login failed,Try Again");
      });
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (e.target.value === "Admin") {
      setuserType("admin");
    } else {
      setuserType("user");
    }
  };

  return (
    <div className="container-LOGIN">
      <div className="container1-LOGIN">
        <div className="container2-LOGIN"></div>
        <div className="container3-LOGIN">
          <div className="container4-LOGIN">
            <div className="container7-LOGIN">
              <form className="form-LOGIN" onSubmit={handleSubmit}>
                <span className="text-LOGIN">MACHINE LOGIN</span>
                <div className="container8-LOGIN">
                  <input
                    type="text"
                    placeholder="Username"
                    className="textinput-LOGIN"
                    id="username"
                    onChange={handleUsernameChange}
                  />
                </div>
                <div className="container8-LOGIN">
                  <input
                    type="password"
                    placeholder="Password"
                    className="textinput-LOGIN"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button className="savebutton-LOGIN">SIGN IN</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
