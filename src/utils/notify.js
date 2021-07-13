import { toast } from "react-toastify";

export const notify = (content, type) => {
    if (type === "success") {
      toast.success(content, { position: toast.POSITION.TOP_CENTER });
    } else {
      toast.error(content, { position: toast.POSITION.TOP_CENTER });
    }
  };