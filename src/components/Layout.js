import React from "react";
import classes from "./_Layout.module.scss";

function Layout(props) {
  return <div className={classes.wrapper}>{props.children}</div>;
}

export default Layout;
