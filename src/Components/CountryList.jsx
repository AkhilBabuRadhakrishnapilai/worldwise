import styles from "./CountryList.module.css";
import Spinner from "../Components/Spinner";
import propTypes from "prop-types";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

const CountryList = () => {
  const { cities, isLoading } = useCities();

  CountryList.propTypes = {
    cities: propTypes.array,
    isLoading: propTypes.bool,
  };
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return <Message message="Add your city first by clicking on a city " />;

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [
        ...arr,
        { country: city.country, emoji: city.emoji, id: city.id },
      ];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
};

export default CountryList;
