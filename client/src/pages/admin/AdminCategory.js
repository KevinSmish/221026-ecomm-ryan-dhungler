// @ts-nocheck
import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { Modal } from "antd";
import { useAuth } from "context/auth";
import Jumbotron from "components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import CategoryForm from "../../components/forms/CategoryForm";

const AdminCategory = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [visible, setVisible] = useState(false);

  const [selected, setSelected] = useState(null);
  const [updatingName, setUpdatingName] = useState("");

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/category/list");
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //console.log("post this category => ", name);
      const { data } = await axios.post("/category", { name });
      if (data?.error) {
        toast.error(data.error);
        return;
      }

      loadCategories();
      setName("");
      toast.success(`Category ${name} is created`);
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response.data);
        return;
      }
      toast.error("Create category failed, try again");
      return;
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/category/${selected._id}`, {
        name: updatingName,
      });
      if (data?.error) {
        toast.error(data.error);
        return;
      }

      loadCategories();
      toast.success(`Category ${updatingName} is edited`);
      setSelected(null);
      setUpdatingName("");
      setVisible(false);
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response.data);
        return;
      }
      toast.error("Update category failed, try again");
      return;
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.delete(`/category/${selected._id}`);
      if (data?.error) {
        toast.error(data.error);
        return;
      }

      loadCategories();
      toast.success(`Category ${updatingName} is deleted`);
      setSelected(null);
      setUpdatingName("");
      setVisible(false);
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response.data);
        return;
      }
      toast.error("Delete category failed, try again");
      return;
    }
  };

  return (
    <div>
      <Jumbotron
        title="Admin Dashboard"
        subTitle={`Hello ${auth?.user?.name}`}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-3 mb-2 h4 bg-light">Manage Categories</div>
            <CategoryForm
              value={name}
              setValue={setName}
              handleSubmit={handleSubmit}
            />

            <hr />

            <div className="col">
              {categories?.map((c) => (
                <button
                  key={c._id}
                  type="button"
                  className="btn btn-outline-primary m-3"
                  onClick={() => {
                    setVisible(true);
                    setSelected(c);
                    setUpdatingName(c.name);
                  }}
                >
                  {c.name}
                </button>
              ))}
            </div>

            <Modal
              open={visible}
              onOk={() => setVisible(false)}
              onCancel={() => setVisible(false)}
              footer={null}
            >
              <CategoryForm
                value={updatingName}
                setValue={setUpdatingName}
                handleSubmit={handleUpdate}
                handleDelete={handleDelete}
              />
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCategory;
