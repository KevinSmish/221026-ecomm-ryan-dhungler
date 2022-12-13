import React, { useEffect, useState } from "react";
import Jumbotron from "components/cards/Jumbotron";
import { useAuth } from "context/auth";
import AdminMenu from "components/nav/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import moment from "moment";

const AdminProducts = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const { data } = await axios.get("products");
      if (data?.error) {
        toast.error(data.error);
        setProducts([]);
        return;
      }
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div>
      <Jumbotron
        title="Admin Dashboard"
        // @ts-ignore
        subTitle={`Hello ${auth?.user?.name}`}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-3 mb-2 h4 bg-light">Admin Products</div>

            <div className="col">
              {products?.map((p) => (
                <Link
                  key={p._id}
                  className="btn btn-outline-primary m-3"
                  to={`update/${p.slug}`}
                >
                  <div className="card mb-3">
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src={`${
                            process.env.REACT_APP_BASE_URL
                          }/products/photo/${p._id}?${new Date().getTime()}`}
                          alt={p.name}
                          className="img img-fluid rounded-start"
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{p.name}</h5>
                          <p className="card-text">{p.description}</p>
                          <p className="card-text">
                            <small className="text-muted">
                              {moment(p.createdAt).format(
                                "MMMM Do YYYY, hh:mm:ss a"
                              )}
                            </small>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
