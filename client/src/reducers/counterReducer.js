/* eslint-disable */
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import API from "../utils/API";

async function getNomCount() {
  await API.getNominations().then((result) => {
    console.log(result.data + 1);
  });
}

// const { data } = getNomCount()

// track state and persist through local storage (MVP only)
const initialState = {
  loading: false,
  count: 0,
};

const persistConfig = {
  key: "root",
  storage,
  // whitelist: [counterReducer]
};

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "SETUSER":
      // return  { count: getNomCount()}
      return getNomCount(), {count: state.count + 1};
    default:
      return state;
  }
}

export default persistReducer(persistConfig, counterReducer);
