import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { useAuth } from "context/auth";
import axios, { AxiosError } from "axios";
import Jumbotron from "components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const AdminProduct = () => {
  // context
  const [auth, setAuth] = useAuth();

  // state
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [category, setCategory] = useState(null);
  const [shipping, setShipping] = useState(0);
  const [quantity, setQuantity] = useState(0);

  // Hooks
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const { data } = await axios.get("/category/list");
        setCategories(data);
      } catch (err) {
        console.log(err);
      }
    };

    loadCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();

      productData.append("photo", photo);
      productData.append("name", name);
      productData.append("description", description);
      // @ts-ignore
      productData.append("price", price);
      productData.append("category", category);
      // @ts-ignore
      productData.append("shipping", shipping);
      // @ts-ignore
      productData.append("quantity", quantity);

      const { data } = await axios.post("/products", productData);
      if (data?.error) {
        toast.error(data.error);
        return;
      }

      toast.success(`Product ${name} is created`);
      navigate("/dashboard/admin/products");
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response.data);
        return;
      }
      console.log(err);
      toast.error("Create product failed, try again");
    }
  };

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
            <div className="p-3 mt-3 mb-2 h4 bg-light">Manage Products</div>

            {photo && (
              <div className="text-center">
                <img
                  // @ts-ignore
                  src={URL.createObjectURL(photo)}
                  alt="product"
                  className="img img-responsive"
                  height="200px"
                />
              </div>
            )}

            <div className="pt-2">
              <label className="btn btn-outline-secondary col-12 mb-3">
                {photo
                  ? // @ts-ignore
                    photo.name
                  : "Upload photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  // @ts-ignore
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>

            <input
              type="text"
              className="form-control p-2 mb-3"
              placeholder="Write a name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <textarea
              className="form-control p-2 mb-3"
              placeholder="Write a description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              type="number"
              className="form-control p-2 mb-3"
              placeholder="Write a price"
              value={price}
              // @ts-ignore
              onChange={(e) => setPrice(e.target.value)}
            />

            <Select
              showSearch
              bordered={false}
              size="large"
              className="form-select mb-3"
              placeholder="Choose a category"
              onChange={(value) => setCategory(value)}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>

            <Select
              bordered={false}
              size="large"
              className="form-select mb-3"
              placeholder="Choose shipping"
              onChange={(value) => setShipping(value)}
            >
              <Option value="0">No</Option>
              <Option value="1">Yes</Option>
            </Select>

            <input
              type="number"
              min={1}
              className="form-control p-2 mb-3"
              placeholder="Write a quantity"
              value={quantity}
              // @ts-ignore
              onChange={(e) => setQuantity(e.target.value)}
            />

            <button className="btn btn-primary mb-5" onClick={handleSubmit}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;
