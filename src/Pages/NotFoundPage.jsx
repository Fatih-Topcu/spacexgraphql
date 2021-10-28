import React from "react";
import { Link, Redirect } from "react-router-dom";
import "../styles/styles.css";

const NotFoundPage = () => {
  return (
    <>
      <div className="notfound-header page-header">Not Found - 404</div>
      <Link to="/">
        <div className="home-return-link">Click to return homepage</div>
      </Link>
    </>
  );
};

export default NotFoundPage;
