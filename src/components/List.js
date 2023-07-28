import React, { useState } from "react";
import Layout from "./Layout";
import classes from "./_List.module.scss";
import { GoChevronDown } from "react-icons/go";

function List(props) {
  const [toggleArr, setToggleArr] = useState({
    val: 0,
    bool: false,
  });

  let loadedData = props.loadedDatas;

  const sortingHandler = (val) => {
    if (val === 1) {
      loadedData.sort((a, b) => (!toggleArr.bool ? b.id - a.id : a.id - b.id));
    }

    if (val === 2) {
      loadedData.sort((a, b) =>
        !toggleArr.bool ? b.body.length - a.body.length : a.id - b.id
      );
    }
    if (val === 3) {
      loadedData.sort((a, b) =>
        !toggleArr.bool ? b.title.length - a.title.length : a.id - b.id
      );
    }
    setToggleArr(() => {
      return { val: val, bool: !toggleArr.bool };
    });
  };

  return (
    <Layout>
      <table>
        <thead>
          <tr>
            <th>
              <p>ID</p>
              <GoChevronDown
                onClick={() => {
                  sortingHandler(1);
                }}
                className={`${classes.icon} ${
                  toggleArr.val === 1 && toggleArr.bool ? classes.active : ""
                }`}
              />
            </th>
          </tr>
          <tr>
            <th>
              <p>Заголовок</p>
              <GoChevronDown
                onClick={() => {
                  sortingHandler(2);
                }}
                className={`${classes.icon} ${
                  toggleArr.val === 2 && toggleArr.bool ? classes.active : ""
                }`}
              />
            </th>
          </tr>
          <tr>
            <th>
              <p>Описание</p>
              <GoChevronDown
                onClick={() => {
                  sortingHandler(3);
                }}
                className={`${classes.icon} ${
                  toggleArr.val === 3 && toggleArr.bool ? classes.active : ""
                }`}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {loadedData.map((item, i) => (
            <tr key={i}>
              <td>{item.id}</td>
              <td>{item.body}</td>
              <td>{item.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}

export default List;
