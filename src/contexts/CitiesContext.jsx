import {
  createContext,
  useState,
  useEffect,
  useContext,
  useReducer,
} from "react";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:9000";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
};

function reducer(state, action){
  switch(action.type){
    case "cities/loaded":
      return {
        
      }
  }
}

const CitiesProvider = ({ children }) => {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsloading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsloading(!isLoading);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("There wass an error loading the data....");
      } finally {
        setIsloading(false);
      }
    };
    fetchCities();
  }, []);

  const getCity = async (id) => {
    try {
      setIsloading(!isLoading);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("There wass an error loading the data....");
    } finally {
      setIsloading(false);
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw Error("CitiesContext was used outside the Cities Provider");
  return context;
};

export { CitiesProvider, useCities };
