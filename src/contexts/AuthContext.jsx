import { createContext, useContext, useReducer } from "react";

const FakeAuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw Error("Unknown Action");
  }
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const AuthContext = ({ children }) => {
  const [{ user, isAuthenticated }, disptach] = useReducer(
    reducer,
    initialState
  );
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      disptach({ type: "login", payload: FAKE_USER });
  }

  function logout() {}
  return (
    <FakeAuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </FakeAuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(FakeAuthContext);
  if (context === undefined)
    throw Error("FakeAuthContext was used outside the FakeAuthProvider");
  return context;
};

export { AuthContext, useAuth };
