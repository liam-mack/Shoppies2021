/* eslint-disable */
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import API from "../utils/API";

let userCount;


async function getNomCount() {
  // const userNoms = API.getNominations()
  await API.getNominations().then((result) => {
    // console.log("Total nominations: " + result);
    userCount = result
    return result
  });
}

// track state and persist through local storage
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
      return getNomCount(),{ count: state.count + 1 };
    case "DECREMENT":
      return getNomCount(),{ count: state.count - 1 };
    case "SETUSER":
      console.log(userCount);
      return getNomCount(), {count: userCount}
      // {count: userCount};
    default:
      return state;
  }
}

export default persistReducer(persistConfig, counterReducer);
