import React, { useState, useEffect, Route } from "react";
import Axios from "axios";
import { API_SERVER } from "../constant/values";
import { useParams, useHistory } from "react-router-dom";

export default () => {
    const [data, setData] = useState([]);

    const { id } = useParams();

    let history = useHistory();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        Axios.get(`${API_SERVER}/bookshow/` + id, {
            headers: {
                authorization: (
                    JSON.parse(localStorage.getItem("authorization")) || {}
                ).access_token,
            },
        })
            .then(({ data }) => {
                setData(data.data[0]);
            })
            .catch((err) => console.error(err));
    };

    return (
        <>
            <div className="xp-contentbar">
                <div className="row mt-3 mb-2">
                    <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => history.goBack()}
                    >
                        &#8592; Back
                    </button>
                    <div className="col-6 offset-3 text-center ">
                        <h4>{data.title}</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 p-3 text-center">
                        <img
                            className="img-thumbnail"
                            src={data.image}
                            style={{
                                maxHeight: "500px",
                                maxWidth: "350px",
                                objectFit: "cover",
                            }}
                        />
                    </div>
                    <div className="col-lg-5 p-3 my-4">
                        <div className="container">
                            <p>{data.description}</p>
                            <div className="pt-5">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h4>Writen by: </h4>
                                        <h6>
                                            <a href="#">
                                                <span className="mdi mdi-account">
                                                    {data.author}
                                                </span>
                                            </a>
                                        </h6>
                                    </div>
                                    <div className="col-md-6">
                                        <h4>Genres: </h4>
                                        <a className="mx-1" href="#">
                                            <span className="mdi mdi-book-variant">
                                                {data.genre}
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
