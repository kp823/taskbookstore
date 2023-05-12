import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import Axios from "axios";
import { API_SERVER } from "../constant/values";
import { Pagination } from "react-laravel-paginex";
import ReactPaginate from "react-paginate";
import { filter } from "lodash";
import BookShow from "../page/BookShow";
import { Link } from "react-router-dom";

export default () => {
    const [data, setData] = useState([]);
    const [pdata, setpData] = useState([]);
    const [keys, setKeys] = useState([]);
    const [query, setQuery] = useState("");
    const [squery, setsQuery] = useState("title");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        Axios.get(`${API_SERVER}/bookshow`, {
            headers: {
                authorization: (
                    JSON.parse(localStorage.getItem("authorization")) || {}
                ).access_token,
            },
        })
            .then(({ data }) => {
                setData(data.data.data);
                setpData(data.data);
                setKeys(Object.keys(data.data.data[0]));
            })
            .catch((err) => console.error(err));
    };

    const filter = () => {
        Axios.get(
            `${API_SERVER}/bookshow?parameter=` + squery + `&value=` + query,
            {
                headers: {
                    authorization: (
                        JSON.parse(localStorage.getItem("authorization")) || {}
                    ).access_token,
                },
            }
        )
            .then(({ data }) => {
                setData(data.data.data);
                setpData(data.data);
            })
            .catch((err) => console.error(err));
    };

    const getData = (data) => {
        Axios.get(`${API_SERVER}/bookshow?page=` + data.page, {
            headers: {
                authorization: (
                    JSON.parse(localStorage.getItem("authorization")) || {}
                ).access_token,
            },
        })
            .then(({ data }) => {
                setData(data.data.data);
                setpData(data.data);
                setKeys(Object.keys(data.data.data[0]));
            })
            .catch((err) => console.error(err));
    };

    const handleChange = (event) => {
        let value = event.target.value;
        setsQuery(value);
    };

    return (
        <>
            <div className="row">
                <div className="col-md-12 col-lg-12 col-xl-12">
                    <select
                        style={{
                            position: "relative",
                            minWidth: "200px",
                            marginRight: "10px",
                            padding: "5px",
                        }}
                        onChange={(e) => handleChange(e)}
                    >
                        {["title", "author", "genre", "isbn", "published"].map(
                            (item, idx) => (
                                <option key={idx} value={item}>
                                    {item}
                                </option>
                            )
                        )}
                    </select>
                    <input
                        size="lg"
                        placeholder="Search by title, e.g. Bird"
                        mb="1rem"
                        name="query"
                        value={query}
                        onChange={({ target }) => setQuery(target.value)}
                        type="search"
                        width={{ base: "90vw", md: "600px" }}
                        bg="white"
                        style={{ marginRight: "10px", padding: "4px" }}
                    />
                    <button
                        className="btn btn-sm btn-primary"
                        type="button"
                        style={{ paddingTop: "6px", paddingBottom: "6px" }}
                        onClick={filter}
                    >
                        Search
                    </button>
                </div>
            </div>

            <div className="xp-contentbar">
                <div className="row">
                    <div className="col-md-12 col-lg-12 col-xl-12">
                        <div className="text-center mt-3 mb-5">
                            <div className="row">
                                {data.map((item, idx) => (
                                    <div
                                        className="col-md-3 col-lg-3 col-xl-2dot4 mb-3"
                                        key={idx}
                                    >
                                        <div className="card m-b-30">
                                            <img
                                                className="card-img-top img-fluid p-2"
                                                src={item.image}
                                                alt="Card image cap"
                                                style={{
                                                    height: "300px",
                                                    width: "300px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                            i
                                            <div className="card-body">
                                                <h5 className="card-title">
                                                    {/* <Route
                                                        path={
                                                            "/bookshow/" +
                                                            item.id
                                                        }
                                                        component={BookShow}
                                                    /> */}
                                                    <Link
                                                        to={`/bookshow/${item.id}`}
                                                    >
                                                        {item.title}
                                                    </Link>
                                                    {/* <a href="">{item.title}</a> */}
                                                </h5>
                                                <p className="card-text">
                                                    {item.description}
                                                </p>
                                            </div>
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item">
                                                    <a href="#">
                                                        <span className="mdi mdi-account">
                                                            {item.author}
                                                        </span>
                                                    </a>
                                                </li>
                                            </ul>
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item">
                                                    <a href="#">
                                                        <span className="mdi mdi-book-variant">
                                                            {item.genre}
                                                        </span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Pagination changePage={getData} data={pdata} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
