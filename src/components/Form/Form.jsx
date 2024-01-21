import "./Form.css";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaPhone } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../Global";
import { errornotify, successnotify } from "../Tostify/Tostify";

const Form = ({ ispage }) => {
  const navigate = useNavigate();
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [phone, setPhone] = useState("");

  const signupHandler = (objsend) => {
    axios
      .post(`${API_URL}/signup`, objsend)
      .then((res) => {
        successnotify(res.data.message);
        setEmail("");
        setName("");
        setPassword("");
        setPhone("");
        navigate("/Login");
      })
      .catch((error) => {
        errornotify(error.response.data.message);
      });
  };

  const loginHandler = (objsend) => {
    axios
      .post(`${API_URL}/signin`, objsend)
      .then((res) => {
        localStorage.setItem("token", res.data.Token);
        successnotify(res.data.message);
        setEmail("");
        setPassword("");
        navigate("/Home");
      })
      .catch((error) => {
        errornotify(error.response.data.message);
      });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (ispage) {
      if (!email || !password) {
        successnotify("Required Feild Are Missing");
        return;
      }
      const objsend = {
        email,
        password,
      };
      loginHandler(objsend);
    } else {
      if (!name || !email || !password || !phone) {
        errornotify("Required Feild Are Missing");
        return;
      }
      const objsend = {
        name,
        email,
        password,
        phone,
      };
      signupHandler(objsend);
    }
  };

  return (
    <>
      <div className="body">
        <div className="heading">
          <h1>
            <span>Welcome !</span> to Blog Post
          </h1>
          <p>
            Embark on a journey of self-expression and community. Your presence
            adds another layer to the rich tapestry of voices woven together at
            Blog Post.
          </p>
          <p>
            Ready to share your story? Click "Create Account" and become part of
            our growing family of storytellers.
          </p>
          {ispage ? (
            <div className="button-login">
              <Link to="/">SignUp</Link>
            </div>
          ) : (
            <div className="button-login">
              <Link to="/Login">Login</Link>
            </div>
          )}
        </div>
        <div className="content">
          {!ispage ? (
            <div className="text">SignUp</div>
          ) : (
            <div className="text">SignIn</div>
          )}

          <form onSubmit={submitHandler}>
            {!ispage && (
              <div className="field">
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <span>
                  <FaRegUser />
                </span>
              </div>
            )}
            <div className="field">
              <input
                type="email"
                placeholder="Email or Phone"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span>
                <IoMdMail />
              </span>
            </div>
            <div className="field">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span>
                <FaLock />
              </span>
            </div>
            {!ispage && (
              <div className="field">
                <input
                  type="tel"
                  placeholder="Enter Your Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <span>
                  <FaPhone />
                </span>
              </div>
            )}
            <div className="forgot-pass">
              <Link to="#">Forgot Password?</Link>
            </div>
            <div className="button">
              {!ispage ? <button>SignUp</button> : <button>SignIn</button>}
            </div>
            <div className="sign-up">
              Not a member?
              {!ispage ? (
                <Link to="/Login">sign in now</Link>
              ) : (
                <Link to="/">signup now</Link>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
