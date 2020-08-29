import React from "react";
import Menu from "./Menu";
import "../styles.css";

const Layout = ({
    title = "Title",
    description = "Description",
    className,
    children
}) => (
    <div>
        <Menu />
        <div className="jumbotron">
            <h2 style={{color: "black"}}>{title}</h2>
            <p className="lead" style={{color: "black"}}>{description}</p>
        </div>
        <div className={className}>{children}</div>
    </div>
);

export default Layout;
