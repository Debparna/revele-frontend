import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createProduct, getCategories } from "./apiAdmin";

const AddProduct = () => {
    const [values, setValues] = useState({
        name: "",
        description: "",
        categories: [],
        product1: "",
        link1: "",
        product2: "",
        link2: "",
        product3: "",
        link3: "",
        category: "",
        photo: "",
        loading: false,
        error: "",
        createdProduct: "",
        redirectToProfile: false,
        formData: ""
    });

    const button = {
        borderRadius: 25,
        color: 'white',
        backgroundColor: '#A88BEB',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        border: 'none',

    };

    const { user, token } = isAuthenticated();
    const {
        name,
        description,
        product1,
        link1,
        product2,
        link2,
        product3,
        link3,
        categories,
        category,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    // load categories and set form data
    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    categories: data,
                    formData: new FormData()
                });
            }
        });
    };

    useEffect(() => {
        init();
    }, []);

    const handleChange = name => event => {
        const value =
            name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });

        createProduct(user._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: "",
                    description: "",
                    photo: "",
                    product1: "",
                    link1: "",
                    product2: "",
                    link2: "",
                    product3: "",
                    link3: "",
                    loading: false,
                    createdProduct: data.name
                });
            }
        });
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <h3>Create a Product Playlist</h3>
            <br />

            <div className="form-group">
                <label className="text-muted">Give Your Product Playlist a Name ✨</label>
                <input
                    onChange={handleChange("name")}
                    type="text"
                    className="form-control"
                    value={name}
                />
            </div>
              <br />
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input
                        onChange={handleChange("photo")}
                        type="file"
                        name="photo"
                        accept="image/*"
                    />
                </label>
            </div>
              <br />
            <div className="form-group">
                <label className="text-muted"> Product Playlist Description. Tell us what your playlist is about?</label>
                <textarea
                    onChange={handleChange("description")}
                    className="form-control"
                    value={description}
                />
            </div>
              <br />
            <div className="form-group">
                <label className="text-muted">Which Category Does Your Playlist Fall Under?</label>
                <select
                    onChange={handleChange("category")}
                    className="form-control"
                >
                    <option>Please select</option>
                    {categories &&
                        categories.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>
              <br />
            <div className="form-group">
                <label className="text-muted">Now lets add products to your playlist. What is your first Product's Name?</label>
                <input
                    onChange={handleChange("product1")}
                    type="text"
                    className="form-control"
                    value={product1}
                />
            </div>
              <br />
            <div className="form-group">
                <label className="text-muted"> Add a link to where everyone can find the product and/or tell everyone why you love this product 😍</label>
                <textarea
                    onChange={handleChange("link1")}
                    className="form-control"
                    value={link1}
                />
            </div>
              <br />
            <div className="form-group">
                <label className="text-muted">Now, let's do the same for the rest of the products! Product Name</label>
                <input
                    onChange={handleChange("product2")}
                    type="text"
                    className="form-control"
                    value={product2}
                />
            </div>
              <br />
            <div className="form-group">
                <label className="text-muted"> Product Link & Description</label>
                <textarea
                    onChange={handleChange("link2")}
                    className="form-control"
                    value={link2}
                />
            </div>
              <br />
            <div className="form-group">
                <label className="text-muted">Product Name</label>
                <input
                    onChange={handleChange("product3")}
                    type="text"
                    className="form-control"
                    value={product3}
                />
            </div>
              <br />
            <div className="form-group">
                <label className="text-muted"> Product Link & Description</label>
                <textarea
                    onChange={handleChange("link3")}
                    className="form-control"
                    value={link3}
                />
            </div>
            <br />
            <button className="btn btn-outline-primary" style={button}>Create Playlist</button>
              <br />
              <br />
              <br />
              <br />
        </form>
    );

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    const showSuccess = () => (
        <div
            className="alert alert-info"
            style={{ display: createdProduct ? "" : "none" }}
        >
            <h2>{`${createdProduct}`} is created!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    return (
      <Layout
        title = "Revele"
        description = "Discover and share curated products you love ✨"
      >
            <div className="row">
                <div className="col-md-4 offset-md-4" >
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                </div>
            </div>
        </Layout>
    );
};

export default AddProduct;
