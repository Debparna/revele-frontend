import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";

const Card = ({ product, showViewProductButton = true }) => {

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

    const headerStyle = {
      fontSize: '30px',
      fontWeight: '300',
    }

    const card = {
        borderRadius: 25,
        textAlign: 'center',
        width: '80%',
    };

    const cardHeader = {
      backgroundColor: 'white',
      borderRadius: 25,
    }

    const showViewButton = showViewProductButton => {
        return (
            showViewProductButton && (
                <Link to={`/product/${product._id}`} className="mr-2">
                    <button className="btn btn-outline-primary mt-2 mb-2" style={button}>
                        View Product Playlist
                    </button>
                </Link>
            )
        );
    };

    const showAddToCartButton = () => {
        return (
            <button className="btn btn-outline-warning mt-2 mb-2">
                Add to cart
            </button>
        );
    };

    {/*
    const showStock = quantity => {
        return quantity > 0 ? (
            <span className="badge badge-primary badge-pill">In Stock</span>
        ) : (
            <span className="badge badge-primary badge-pill">Out of Stock</span>
        );
    }; */}

    return (
        <div className="card" style={card} >

            <div className="card-body">
                <ShowImage item={product} url="product" />
                <div style={headerStyle} >{product.name}</div>
                <p className="lead mt-2" >
                    {product.description.substring(0, 100)}
                </p>
                {/* <p> ${product.price}</p> */}
                    {showViewButton(showViewProductButton)}
                    <br />
                    Category: {product.category && product.category.name}

                {/*  {showStock(product.quantity)} */}

                <br />
                Added on {moment(product.createdAt).fromNow()}

                {/* {showAddToCartButton()} */}
            </div>
        </div>
    );
};

export default Card;
