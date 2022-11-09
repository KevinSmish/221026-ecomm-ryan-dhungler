import React, { useState } from "react";
import toast from "react-hot-toast";
import Jumbotron from "components/cards/Jumbotron";
import axios from "../../axios";

const Register = () => {
  const [name, setName] = useState("Kevin");
  const [email, setEmail] = useState("null@mail.ru");
  const [password, setPassword] = useState("123");

  const save = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post("/users/register", {
        name,
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        localStorage.setItem("auth", JSON.stringify(data));
        //        setAuth({ ...auth, token: data.token, user: data.user });
        toast.success(`Registration ${email} successful`);
        //        navigate("/dashboard/user");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Jumbotron title="Register" />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={save}>
              <input
                type="text"
                className="form-control mb-4 p-2"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
              <input
                type="email"
                className="form-control mb-4 p-2"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="form-control mb-4 p-2"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
