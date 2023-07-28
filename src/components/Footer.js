import React from "react";
import classes from "./_Footer.module.scss";
function Footer(props) {
  return (
    <div className={classes["footer-container"]}>
      <button
        onClick={props.onPrevPage}
        className={`${classes.btn} ${classes["btn-previous"]}`}
      >
        Prev
      </button>
      <ul className={classes.pagination}>
        {props.numbers.map((n, i) => (
          <li className={`${classes["page-item"]}`} key={i}>
            <a
              href="#"
              onClick={() => props.onChangeCurPage(n)}
              className={`${classes["page-link"]} ${
                classes[props.currentPage === n ? "active" : ""]
              }`}
            >
              {n}
            </a>
          </li>
        ))}
      </ul>
      {/* /////////////////// */}
      <button
        onClick={props.onNextPage}
        className={`${classes.btn} ${classes["btn-next"]}`}
      >
        Next
      </button>
    </div>
  );
}

export default Footer;
