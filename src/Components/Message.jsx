import styles from "./Message.module.css";
import propTypes from "prop-types";

function Message({ message }) {
  Message.propTypes = {
    message: propTypes.string,
  };
  return (
    <p className={styles.message}>
      <span role="img">👋</span> {message}
    </p>
  );
}

export default Message;
