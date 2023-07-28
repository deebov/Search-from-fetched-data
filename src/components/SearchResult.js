import React from "react";
import classes from "./_SearchResult.module.scss";

function SearchResult(props) {
  const data = props.filteredResult;

  return (
    <table className={classes.resultContainer}>
      <thead>
        <tr>
          <td>ID</td>
        </tr>
        <tr>
          <td>Заголовок</td>
        </tr>
        <tr>
          <td>Описание</td>
        </tr>
      </thead>
      <tbody className={classes.foundData}>
        {data.map((item, i) => (
          <tr
            onClick={() => {
              props.onShowFilteredData([item]);
            }}
            key={i}
          >
            <td>{item.id}</td>
            <td>{item.body}</td>
            <td>{item.title}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SearchResult;
