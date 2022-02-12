import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
/* import Modal from "../../shared/components/UIElements/Modal"; */
import UpdateProductStats from "../pages/UpdateProductStats";
import { Checkbox } from "@mui/material";
import { Avatar } from "@mui/material";
import Box from "@mui/material/Box";
/* import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'; */
import Modal from "@mui/material/Modal";

import "./ProductList.css";

const ProductList = (props) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalId, setModalId] = useState(false);
  const [columna, setColumna] = useState("name");

  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2> No Shops Found</h2>
        </Card>
      </div>
    );
  }
  const showStatusWarningHandler = (id) => {
    setModalId(id);
    setShowConfirmModal(true);
  };
  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
    props.update();
  };

  const sort = (sort) => {
    setColumna(sort);
    props.sort(sort);
  };

  return (
    <React.Fragment>
      <Modal
        open={showConfirmModal}
        onClose={cancelDeleteHandler}
        className="ds-modal"
      >
        <div>
          <React.Fragment>
            <UpdateProductStats
              token={props.token}
              product={modalId}
              close={cancelDeleteHandler}
            />
            <Button
              inverse
              dClassName="modal-button-cancel"
              onClick={cancelDeleteHandler}
            >
              <i className="fas fa-times"></i>
            </Button>
          </React.Fragment>
        </div>
      </Modal>
      <TableContainer component={Paper} className="Lista-container">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="Lista-H" align="right">
                <Button onClick={() => sort("name")} dClassName="dir-button">
                  
                  Producto&nbsp;&nbsp;&nbsp;
                  {(props.dir === 1 && <i className="fas fa-sort-up"></i>) || (
                    <i className="fas fa-sort-down"></i>
                  )}
                </Button>
              </TableCell>
              <TableCell className="Lista-H">Imagen</TableCell>
              <TableCell align="left" className="Lista-H">
                Descripción
              </TableCell>
              <TableCell align="left" className="Lista-H">
                Categorias
              </TableCell>
              <TableCell align="left" className="Lista-H">
                <Button
                  onClick={() => sort("stats.price")}
                  dClassName="dir-button"
                >
                  Precio&nbsp;&nbsp;&nbsp;
                  {(props.dir === 1 && <i className="fas fa-sort-up"></i>) || (
                    <i className="fas fa-sort-down"></i>
                  )}
                </Button>
              </TableCell>
              <TableCell align="left" className="Lista-H">
                <Button
                  onClick={() => sort("stats.stock")}
                  dClassName="dir-button"
                >
                  Stock&nbsp;&nbsp;&nbsp;
                  {(props.dir === 1 && <i className="fas fa-sort-up"></i>) || (
                    <i className="fas fa-sort-down"></i>
                  )}
                </Button>
              </TableCell>
              <TableCell align="left" className="Lista-H">
                Activo
              </TableCell>
              <TableCell align="center" className="Lista-H">
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.items.map((product) => (
              <TableRow
                key={product.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  align="right"
                  className="Lista"
                >
                  {product.name}
                </TableCell>
                <TableCell align="right" className="Lista">
                  <Avatar
                    alt={product.name}
                    src={`${process.env.REACT_APP_BACKEND_IMG}/${product.image}`}
                    sx={{ width: "2vw", height: "2vw" }}
                  />
                </TableCell>
                <TableCell align="left" className="Lista">
                  {product.description}
                </TableCell>
                <TableCell align="left" className="Lista">
                  {product.categories.map((category) => {
                    return category.name + "  ";
                  })}
                </TableCell>
                <TableCell align="left" className="Lista">
                  {(product.stats && product.stats.price) || "N/A"}
                </TableCell>
                <TableCell align="left" className="Lista">
                  {(product.stats && product.stats.stock) || "N/A"}
                </TableCell>
                <TableCell align="left" className="Lista">
                  <Checkbox />
                </TableCell>
                <TableCell align="left" className="Lista">
                  <Button onClick={() => showStatusWarningHandler(product.id)}>
                    <i className="fas fa-cogs "></i>
                  </Button>
                  <Button to={`//user/update`}>
                    <i className="fas fa-cogs "></i>
                  </Button>
                  <Button to={`//user/update`}>
                    <i className="fas fa-trash-alt"></i>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default ProductList;
