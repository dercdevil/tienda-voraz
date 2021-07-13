export const MapStage = (status) => {
    return status === "IN-PROGRESS"
      ? "Procesando"
      : status === "CREATED"
      ? "Creado"
      : status === "IN-DELIVERY"
      ? "En Delivery"
      : "Recibido";
  };
  