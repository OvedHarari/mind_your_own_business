import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function successMsg(message: string) {
  toast.success(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3000,
  });
}
export function errorMsg(message: string) {
  toast.error(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3000,
  });
}
