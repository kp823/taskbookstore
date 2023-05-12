import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Header from "../components/Header";

import Login from "../page/Login";
import Logout from "../page/Logout";
import BooksManagement from "../page/BooksManagement";
import BooksList from "../page/BooksList";
import BookShow from "../page/BookShow";

const Dashboard = () => (
    <div className="mt-4 mb-4">
        <div className="card">
            <div className="card-header bg-transparent">Book List</div>
            <div className="card-body">
                <BooksList />
            </div>
        </div>
    </div>
);

export default class MainLayout extends Component {
    render() {
        return (
            <>
                <Header {...this.props} />
                <div className="container">
                    <Route exact path="/" component={Dashboard} />
                    <Route path="/bookshow/:id" component={BookShow} />
                    {(JSON.parse(localStorage.getItem("authorization")) || {})
                        .isLoggedIn ? (
                        <>
                            <Route path="/books" component={BooksManagement} />
                            <Redirect to="/" />
                        </>
                    ) : (
                        <Redirect to="/" />
                    )}
                </div>
                <Login />
                <Logout />
            </>
        );
    }
}
