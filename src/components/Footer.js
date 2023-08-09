import { Link } from "react-router-dom";
import classes from "./_Footer.module.scss";

function Footer(props) {
    return (
        <div className={classes["footer-container"]}>
            <button
                disabled={props.page === 1 && "disabled"}
                onClick={props.onPrevPage}
                className={`${classes.btn} ${classes["btn-previous"]}`}>
                Prev
            </button>
            <ul className={classes.pagination}>
                {props.numbers.map((n, i) => (
                    <li className={`${classes["page-item"]}`} key={i}>
                        <Link
                            to={`/posts/${n}`}
                            className={`${classes["page-num"]} ${classes[props.currentPage === n ? "active" : ""]}`}>
                            {n}
                        </Link>
                    </li>
                ))}
            </ul>
            <button
                disabled={props.page === 10 && "disabled"}
                onClick={props.onNextPage}
                className={`${classes.btn} ${classes["btn-next"]}`}>
                Next
            </button>
        </div>
    );
}

export default Footer;
