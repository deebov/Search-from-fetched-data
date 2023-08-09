import React, { useState, useEffect } from "react";
import SearchInput from "./SearchInput";
import List from "./List";
import Footer from "./Footer";
import classes from "./_List.module.scss";
import { useNavigate, useParams } from "react-router-dom";

const Posts = (props) => {
    const navigate = useNavigate();
    const params = useParams();
    const currentPage = parseInt(params.page) || 1;
    const [resetData, setResetData] = useState([]);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [showData, setShowData] = useState(false);
    const [error, setError] = useState(false);

    const recordsPerPage = 10;
    const lastIndex = recordsPerPage * currentPage;
    const firstIndex = lastIndex - recordsPerPage;
    const posts = data.slice(firstIndex, lastIndex);
    const nPage = Math.ceil(data.length / recordsPerPage);
    const numbers = [...Array(nPage + 1).keys()].slice(1);

    useEffect(() => {
        const fetchDatasHandler = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
                if (!response.ok) {
                    throw new Error("Something went wrong!");
                }

                const data = await response.json();
                setData(data);
                setResetData(data);
            } catch (err) {
                console.log(setError(err.message));
            }
        };

        fetchDatasHandler();
    }, []);

    const goToPreviousPage = () => {
        if (currentPage !== 1) {
            navigate(`/posts/${currentPage - 1}`);
        }
    };

    const goToNextPage = () => {
        if (currentPage !== nPage) {
            navigate(`/posts/${currentPage + 1}`);
        }
    };

    const changeCurrentPage = (page) => {
        navigate(`/posts/${page}`);
    };

    const showFilteredDataHandler = (e) => {
        if (e) {
            setData(e);
        } else {
            setData(filteredData);
        }

        navigate("/posts/1");
        setShowData(false);
    };

    const inputChangeHandler = (e) => {
        const userInput = e.target.value.toLowerCase();
        const keys = ["id", "body", "title"];
        let arr = [];

        data.filter((item) => {
            return keys.some((key) => (item[key] + "").includes(userInput)) && arr.push(item);
        });

        setFilteredData(arr);
        setSearchInput(e.target.value);
        setShowData(arr.length > 0 && userInput.length > 0 ? true : false);

        if (e.target.value.length === 0) {
            setData(resetData);
            // navigate("/*");
        }
    };

    return (
        <>
            <SearchInput
                value={searchInput}
                showData={showData}
                filteredData={filteredData}
                onInputChange={inputChangeHandler}
                onShowFilteredData={showFilteredDataHandler}
            />
            {error ? <p className={classes.error}>{error}</p> : <List data={posts} />}
            {!error && (
                <Footer
                    numbers={numbers}
                    currentPage={currentPage}
                    nPage={nPage}
                    onChangeCurPage={changeCurrentPage}
                    onPrevPage={goToPreviousPage}
                    onNextPage={goToNextPage}
                />
            )}
        </>
    );
};

export default Posts;
