import React, { useState, useEffect } from "react";
import Axios from "axios";
import Modal from "../components/Modal";
import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
import { API_SERVER } from "../constant/values";
import { bookManagementState } from "../atom/global";
import { Pagination } from "react-laravel-paginex";

const ModalBooks = (props) => {
    const bookModalState = useRecoilState(bookManagementState);
    const setBookModalState = useSetRecoilState(bookManagementState);

    const saveData = () => {
        const data = { ...bookModalState[0] };
        if (bookModalState[0].id) {
            Axios.patch(`${API_SERVER}/book/${bookModalState[0].id}`, data, {
                headers: {
                    authorization:
                        "Bearer " +
                        (
                            JSON.parse(localStorage.getItem("authorization")) ||
                            {}
                        ).access_token,
                },
            })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => console.error(err));
        } else {
            delete data.id;
            Axios.post(`${API_SERVER}/book`, data, {
                headers: {
                    authorization:
                        "Bearer " +
                        (
                            JSON.parse(localStorage.getItem("authorization")) ||
                            {}
                        ).access_token,
                },
            })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => console.error(err));
        }
        props.onRefresh();
    };

    const onChangeHandle = ({ target }) => {
        return setBookModalState((oldState) => ({
            ...oldState,
            [target.name]: target.value,
        }));
    };

    return (
        <Modal
            name="modalBooksManagement"
            title="Books Management Form"
            actionNameButton="Save"
            actionButton={saveData}
        >
            <div className="container">
                <form>
                    <div className="form-group">
                        <label htmlFor="name">
                            Book Title <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            aria-describedby="title"
                            placeholder="Enter Book Title"
                            value={bookModalState[0].title}
                            onChange={onChangeHandle}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="author">
                            Author <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="author"
                            name="author"
                            aria-describedby="author"
                            placeholder="Enter Book author"
                            value={bookModalState[0].author}
                            onChange={onChangeHandle}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="genre">
                            Genre <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="genre"
                            name="genre"
                            aria-describedby="genre"
                            placeholder="Enter Genre"
                            value={bookModalState[0].genre}
                            onChange={onChangeHandle}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">
                            Description <span style={{ color: "red" }}>*</span>
                        </label>
                        <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            aria-describedby="description"
                            placeholder="Enter description"
                            value={bookModalState[0].description}
                            onChange={onChangeHandle}
                            rows="3"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="isbn">
                            ISBN <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="isbn"
                            name="isbn"
                            aria-describedby="isbn"
                            placeholder="Enter ISBN"
                            value={bookModalState[0].isbn}
                            onChange={onChangeHandle}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="published">
                            Published Date{" "}
                            <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="published"
                            name="published"
                            value={bookModalState[0].published}
                            onChange={onChangeHandle}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="publisher">
                            Publisher <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="publisher"
                            name="publisher"
                            aria-describedby="publisher"
                            placeholder="Enter Publisher"
                            value={bookModalState[0].publisher}
                            onChange={onChangeHandle}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">
                            Image <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="image"
                            name="image"
                            aria-describedby="image"
                            placeholder="Enter Image URL"
                            value={bookModalState[0].image}
                            onChange={onChangeHandle}
                        />
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default () => {
    const [data, setData] = useState([]);
    const [pdata, setpData] = useState([]);

    const setBookModalState = useSetRecoilState(bookManagementState);
    const resetBookModalState = useResetRecoilState(bookManagementState);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        Axios.get(`${API_SERVER}/book`, {
            headers: {
                authorization: (
                    JSON.parse(localStorage.getItem("authorization")) || {}
                ).access_token,
            },
        })
            .then(({ data }) => {
                setData(data.data.data);
                setpData(data.data);
            })
            .catch((err) => console.error(err));
    };

    const removeData = (id) => {
        Axios.delete(`${API_SERVER}/book/${id}`, {
            headers: {
                authorization:
                    "Bearer " +
                    (JSON.parse(localStorage.getItem("authorization")) || {})
                        .access_token,
            },
        })
            .then(() => {
                fetchData();
            })
            .catch((err) => console.error(err));
    };

    const getData = (data) => {
        Axios.get(`${API_SERVER}/book?page=` + data.page, {
            headers: {
                authorization: (
                    JSON.parse(localStorage.getItem("authorization")) || {}
                ).access_token,
            },
        })
            .then(({ data }) => {
                setData(data.data.data);
                setpData(data.data);
            })
            .catch((err) => console.error(err));
    };

    return (
        <>
            <div className="mt-5">
                <div className="card">
                    <div className="card-header bg-transparent">
                        <div className="d-flex justify-content-between">
                            Book Management
                            <button
                                className="btn btn-sm btn-success"
                                data-toggle="modal"
                                data-target="#modalBooksManagement"
                                onClick={resetBookModalState}
                            >
                                Add New Book
                            </button>
                        </div>
                    </div>
                    <div className="card-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Genre</th>
                                    <th>ISBN</th>
                                    <th>Description</th>
                                    <th>PublishedDate</th>
                                    <th>Publisher</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>
                                            <img
                                                src={item.image}
                                                style={{
                                                    height: "50px",
                                                    width: "50px",
                                                }}
                                            />
                                        </td>
                                        <td>{item.title}</td>
                                        <td>{item.author}</td>
                                        <td>{item.genre}</td>
                                        <td>{item.isbn}</td>
                                        <td>{item.description}</td>
                                        <td>{item.published}</td>
                                        <td>{item.publisher}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-info"
                                                style={{
                                                    marginRight: "10px",
                                                }}
                                                data-toggle="modal"
                                                data-target="#modalBooksManagement"
                                                onClick={() =>
                                                    setBookModalState(item)
                                                }
                                            >
                                                Edit
                                            </button>
                                            {(
                                                (
                                                    JSON.parse(
                                                        localStorage.getItem(
                                                            "authorization"
                                                        )
                                                    ) || {}
                                                ).user || {}
                                            ).role === 1 ? (
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() =>
                                                        removeData(item.id)
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            ) : null}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination changePage={getData} data={pdata} />
                    </div>
                </div>
            </div>
            <ModalBooks onRefresh={fetchData} />
        </>
    );
};
