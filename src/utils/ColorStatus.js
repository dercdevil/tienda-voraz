export const ColorStatus = (status) => {
  return status === "IN-PROGRESS"
    ? "warning"
    : status === "SUCCESS"
    ? "success"
    : status === "FAIL"
    ? "danger"
    : "Rejet";
};
