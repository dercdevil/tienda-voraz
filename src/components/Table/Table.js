import React from "react";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { api } from "constans";
const url = api;

const EnhancedTable = ({ page, handlechanindex, deleteProduct }) => {
  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell>Imagen</TableCell>
          <TableCell>Nombre</TableCell>
          <TableCell>Descipción</TableCell>
          <TableCell>Tiempo de Preparacion</TableCell>
          <TableCell align="center">Precio</TableCell>
          <TableCell align="center"> </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {page.map((row) => (
          <TableRow key={row.id}>
            <TableCell>
              <Avatar
                alt="product"
                src={
                  row.gallery[0] ? url + "/" + row.gallery[0].img_product : null
                }
              />
            </TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.description}</TableCell>
            <TableCell>{row.time_for_preparation} Min</TableCell>
            <TableCell align="center">${row.price}</TableCell>

            <TableCell align="right">
              <IconButton
                aria-label="edit"
                onClick={() => handlechanindex(row)}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={() => deleteProduct(row.id)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>{" "}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default EnhancedTable;
