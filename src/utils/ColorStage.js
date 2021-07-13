export const ColorStage = (status) => {
    return status === "IN-PROGRESS"
      ? "warning"
      : status === "CREATED"
      ? "success"
      : status === "IN-DELIVERY"
      ? "success"
      : "success";
  };
  