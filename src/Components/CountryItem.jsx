import styles from "./CountryItem.module.css";
import propTypes from "prop-types";

function CountryItem({ country }) {
  CountryItem.propTypes = {
    country: propTypes.object,
  };
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
