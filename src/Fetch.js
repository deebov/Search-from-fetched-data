//  SearchInput.js

// props.loadedData.filter((item) => {
//   (item.body.includes(userInput) ||
//     item.title.includes(userInput) ||
//     (item.id + "").includes(userInput)) &&
//     arr.push(item);
// });

import React, { useState, useEffect, useCallback } from "react";
import SearchInput from "./components/SearchInput";
import List from "./components/List";
import Footer from "./components/Footer";
import SearchResult from "./components/SearchResult";

function App() {
  const [datas, setDatas] = useState([]);
  const [resetData, setResetData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [showData, setShowData] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = recordsPerPage * currentPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = (filteredData > 0 ? filteredData : datas).slice(
    firstIndex,
    lastIndex
  );
  const nPage = Math.ceil(datas.length / recordsPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  const fetchDatasHandler = useCallback(async () => {
    const response = await fetch(
      ` https://jsonplaceholder.typicode.com/posts `
    );
    const data = await response.json();

    setDatas(data);
    setResetData(data);
  }, []);

  useEffect(() => {
    fetchDatasHandler();
  }, [fetchDatasHandler]);

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage !== nPage) {
      setCurrentPage(currentPage + 1);
    }

    if (nPage > 10) {
      return;
    }
  };
  const changeCurPage = (id) => {
    setCurrentPage(id);
  };

  function reset() {
    if (searchInput.length === 0) {
      console.log("hi");
    }
  }

  function showFilteredDataHandler(e) {
    if (e) {
      setDatas(e);
    } else {
      setDatas(filteredData.length > 0 ? filteredData : datas);
    }

    setCurrentPage(1);
    setShowData(false);
  }

  function inputChangeHandler(e) {
    setSearchInput(e.target.value);
    const userInput = e.target.value.toLowerCase();
    const keys = ["id", "body", "title"];
    let arr = [];

    datas.filter((item) => {
      return (
        keys.some((key) => (item[key] + "").includes(userInput)) &&
        arr.push(item)
      );
    });

    setShowData(arr.length > 0 && userInput.length > 0 ? true : false);
    setFilteredData(arr);

    if (e.target.value.length == 0) {
      setDatas(resetData);
    }
  }

  return (
    <React.Fragment>
      <SearchInput
        value={searchInput}
        showData={showData}
        filteredData={filteredData}
        onReset={reset}
        onInputChange={inputChangeHandler}
        onShowFilteredData={showFilteredDataHandler}
      />

      <List loadedDatas={records} />

      <Footer
        numbers={numbers}
        currentPage={currentPage}
        onChangeCurPage={changeCurPage}
        onPrevPage={prevPage}
        onNextPage={nextPage}
      />
    </React.Fragment>
  );
}

export default App;
