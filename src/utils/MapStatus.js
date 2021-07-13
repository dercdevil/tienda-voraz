export const MapStatus = (status) => {
  return status === "IN-PROGRESS"
    ? "Procesando"
    : status === "SUCCESS"
    ? "Confirmado"
    : status === "FAIL"
    ? "Rechazado"
    : "Rejet";
};
