import { citiesSlice } from "@/utils/redux/slices/cities-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

interface InitializerProps {
  children: React.ReactNode;
}

const Initializer = ({ children }: InitializerProps): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(citiesSlice.actions.initCities());
  }, []);

  return <>{children}</>;
};

export default Initializer;
