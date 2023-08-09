import React, { useState, useEffect, useCallback } from "react";
import SearchInput from "./components/SearchInput";
import List from "./components/List";
import Footer from "./components/Footer";
import classes from "./components/_List.module.scss";
import {
  Routes,
  Route,
  useNavigate,
  useParams,
  Outlet,
} from "react-router-dom";
import Feed from "./components/Feed";

function App() {
  const [datas, setDatas] = useState([]);
  const [resetData, setResetData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [showData, setShowData] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = recordsPerPage * currentPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = datas.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(datas.length / recordsPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  const fetchDatasHandler = useCallback(async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts`
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      setDatas(data);
      setResetData(data);
    } catch (err) {
      console.log(setError(err.message));
    }
  }, []);

  useEffect(() => {
    fetchDatasHandler();
  }, [fetchDatasHandler]);

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      navigate(`/${currentPage - 1}`);
    }
  };
  const nextPage = () => {
    if (currentPage !== nPage) {
      setCurrentPage(currentPage + 1);
      navigate(`/${currentPage + 1}`);
    }

    if (nPage > 10) {
      return;
    }
  };
  const changeCurPage = (id) => {
    setCurrentPage(id);
    navigate(`/${id}`);
  };

  function showFilteredDataHandler(e) {
    if (e) {
      setDatas(e);
    } else {
      setDatas(filteredData);
    }

    setCurrentPage(1);
    setShowData(false);
  }

  function inputChangeHandler(e) {
    const userInput = e.target.value.toLowerCase();
    const keys = ["id", "body", "title"];
    let arr = [];

    datas.filter((item) => {
      return (
        keys.some((key) => (item[key] + "").includes(userInput)) &&
        arr.push(item)
      );
    });

    setFilteredData(arr);
    setSearchInput(e.target.value);
    setShowData(arr.length > 0 && userInput.length > 0 ? true : false);

    if (e.target.value.length === 0) {
      setDatas(resetData);
      // navigate("/*");
    }
  }

  const content = error ? (
    <p className={classes.error}>{error}</p>
  ) : (
    <Routes>
      <Route path={"/"} element={<List loadedDatas={records} />}>
        <Route path={`/:${currentPage}`} />
      </Route>
    </Routes>
  );

  return (
    <>
      <SearchInput
        value={searchInput}
        showData={showData}
        filteredData={filteredData}
        onInputChange={inputChangeHandler}
        onShowFilteredData={showFilteredDataHandler}
      />
      {content}

      {!error && (
        <Footer
          numbers={numbers}
          currentPage={currentPage}
          nPage={nPage}
          onChangeCurPage={changeCurPage}
          onPrevPage={prevPage}
          onNextPage={nextPage}
        />
      )}
    </>
  );
}

export default App;
