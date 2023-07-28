import React from "react";
import classes from "./_SearchInput.module.scss";
import Layout from "./Layout";
import { GoSearch } from "react-icons/go";
import SearchResult from "./SearchResult";

function SearchInput(props) {
  return (
    <Layout>
      <div className={classes.searchContainer}>
        <input
          onChange={props.onInputChange}
          type="text"
          placeholder="search"
          value={props.value}
        />
        <GoSearch
          onClick={() => {
            props.onShowFilteredData();
          }}
          className={classes["btn--search"]}
        ></GoSearch>
        {props.showData && (
          <SearchResult
            onShowFilteredData={props.onShowFilteredData}
            filteredResult={props.filteredData}
          />
        )}
      </div>
    </Layout>
  );
}

export default SearchInput;
