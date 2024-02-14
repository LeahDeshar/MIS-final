import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDataFromStorage } from "../components/auth/localstorage";
import { getAllProducts } from "./productAction";
export const useReduxStateHook = (navigation, path = "login") => {
  const { loading, error, msg } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      alert(error);
      dispatch({ type: "clearError" });
    }
    if (msg) {
      alert(msg);
      dispatch(getAllProducts());
      dispatch({ type: "clearMessage" });
      navigation.reset({
        index: 0,
        routes: [{ name: path }],
      });
      fetchDataFromStorage();
    }
  }, [error, dispatch, msg]);
  return loading;
};
