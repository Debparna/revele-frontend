import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Search from "./Search";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts("sold").then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    const create = {
        marginBottom: '30px',
        border: 'none',

    };

    const button = {
        borderRadius: 30,
        color: 'white',
        backgroundColor: '#A88BEB',
        border: 'none',
        paddingTop: '2%',
        paddingBottom: '2%',
        marginBottom: '3%',
        marginLeft: '3%',
        fontSize: '18px',
    };

    const adminLinks = () => {
        return (
            <div style={{create}}>
                <button style={button}> <Link className="nav-link" style={{color:'white'}} to="/create/category">
                    Create a Category
                </Link></button>

                <button style={button}> <Link className="nav-link" style={{color:'white'}} to="/create/product">
                    Create a Playlist
                </Link></button>
            </div>
        );
    };

    const loadProductsByArrival = () => {
        getProducts("createdAt").then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);

    return (
        <Layout
          title="Revele"
          description="Discover and share curated products you love ✨"
            className="container-fluid"
        >
            <h3 style = {{textAlign:'center'}}> Product Playlists </h3>

            <div className="row" style={{justifyContent:'center'}}>
              <div className="col-3" style={{justifyContent:'right'}}> {adminLinks()} </div>
            </div>
            <Search  / >
            <div className="row">
                {productsBySell.map((product, i) => (
                    <div key={i} className="col-4 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>

        </Layout>
    );
};

export default Home;
