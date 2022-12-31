import React, { useState, useEffect } from "react";
import { useAuth } from "context/auth";
import Jumbotron from "components/cards/Jumbotron";
import UserMenu from "../../components/nav/UserMenu";
import axios from "axios";
import { toast } from "react-hot-toast";

const Profile = () => {
  // hooks
  const [auth, setAuth] = useAuth();
  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    // @ts-ignore
    if (auth?.user) {
      // @ts-ignore
      const { name, email, address } = auth?.user;
      setName(name);
      setEmail(email);
      setAddress(address);
    }
    // @ts-ignore
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // @ts-ignore
      const { data } = await axios.put("/users/profile", {
        name,
        password,
        address,
      });
      // console.log("profile updated =>", data);

      if (data?.error) {
        toast.error(data.error);
        return;
      }

      // @ts-ignore
      setAuth({ ...auth, user: data });

      // local storage update
      const ls = JSON.parse(localStorage.getItem("auth"));
      ls.user = data;
      localStorage.setItem("auth", JSON.stringify(ls.user));

      toast.success("Profile updated");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Jumbotron
        title="User Dashboard"
        // @ts-ignore
        subTitle={`Hello ${auth?.user?.name}`}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-3 mb-2 h4 bg-light">Manage Profile</div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control m-2 p-2"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus={true}
              />
              <input
                type="email"
                className="form-control m-2 p-2"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={true}
              />
              <input
                type="password"
                className="form-control m-2 p-2"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <textarea
                className="form-control m-2 p-2"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <button className="btn btn-primary">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
