import React from "react";
import { Routes, Route, useParams, Link } from "react-router-dom";

function Feed(props) {
  return (
    <tr key={props.id}>
      <td>{props.id}</td>
      <td>{props.body}</td>
      <td>{props.title}</td>
    </tr>
  );
}

export default Feed;
