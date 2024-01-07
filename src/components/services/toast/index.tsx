import { ToastContainer, toast as reactToast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const toast = {
  success: (content: string) =>
    reactToast.success(content, { position: "bottom-right", autoClose: 3000 }),
};

const Toast = (): JSX.Element => {
  return <ToastContainer />;
};

export default Toast;
