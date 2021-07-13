import { notify } from "utils/notify";

export function EmptyInventary(inventary) {
  let cont = 0;
  inventary.forEach(function (item, index) {
    if (item.day.length === 0) {
      cont++;
      notify(
        "Upps ocurrio un error, Verifica haber llenado el campo Dia en inventario en la fila " +
          (index + 1)
      );
    }
    if (item.stock === 0) {
      cont++;
      notify(
        "Upps ocurrio un error, Verifica haber llenado el campo Stock en inventario en la fila " +
          (index + 1)
      );
    }
    if (item.time_init.length === 0) {
      cont++;
      notify(
        "Upps ocurrio un error, Verifica haber llenado el campo Tiempo Inicial en inventario en la fila " +
          (index + 1)
      );
    }
    if (item.time_final.length === 0) {
      cont++;
      notify(
        "Upps ocurrio un error, Verifica haber llenado el campo Tiempo Final en inventario en la fila " +
          (index + 1)
      );
    }
  });
  return cont > 0 ? false : true;
}
