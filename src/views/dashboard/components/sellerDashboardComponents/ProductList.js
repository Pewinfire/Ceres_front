import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Card from "../../../../shared/components/UIElements/Card";
import Button from "../../../../shared/components/FormElements/Button";
import UpdateProduct from "./UpdateProduct";
/* import Modal from "../../../shared/components/UIElements/Modal"; */
import UpdateProductStats from "./UpdateProductStats";
import { Checkbox } from "@mui/material";
import { Avatar } from "@mui/material";
import Box from "@mui/material/Box";
import { CSSTransition } from "react-transition-group";
import Modal from "@mui/material/Modal";

import "./ProductList.css";
import { useHttpClient } from "../../../../shared/hooks/http-hook";

const ProductList = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalId, setModalId] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2> No se han encontrado productos</h2>
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
  const showStatusWarningHandlerUpdate = (id) => {
    setModalId(id);
    setShowUpdateModal(true);
  };
  const cancelDeleteHandlerUpdate = () => {
    setShowUpdateModal(false);
    setModalId();
    props.update();
  };
  const showStatusWarningHandlerDelete = (id) => {
    setModalId(id);
    setShowDeleteModal(true);
  };
  const cancelDeleteHandlerDelete = () => {
    setShowDeleteModal(false);
    setModalId();
    props.update();
  };
  const deleteProduct = async () => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/product/${modalId}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + props.token,
        }
      );
    } catch (err) {}
    props.update();
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
      <Modal
        open={showUpdateModal}
        onClose={cancelDeleteHandlerUpdate}
        className="ds-modal"
      >
        <div className="modalProduct">
          <React.Fragment>
            <UpdateProduct
              shop={props.shop}
              token={props.token}
              product={modalId}
              close={cancelDeleteHandlerUpdate}
            />
            <Button
              inverse
              dClassName="modal-button-cancel2"
              onClick={cancelDeleteHandler}
            >
              <i className="fas fa-times"></i>
            </Button>
          </React.Fragment>
        </div>
      </Modal>
      <Modal
        open={showDeleteModal}
        onClose={cancelDeleteHandlerDelete}
        className="ds-modal"
      >
        <div className="modalProductDelete">
          <React.Fragment>
            <h2>Esta seguro de que quiere eliminar el producto?</h2>
            <Button onClick={cancelDeleteHandlerDelete}> Volver</Button>
            <div className={"warning"}>
            <Button
              onClick={() => {
                deleteProduct();
              }}
            >
              {" "}
              Eliminar
            </Button>
            </div>
          </React.Fragment>
        </div>
      </Modal>
      {props.items.map((product) => (
        <CSSTransition key={product.id} timeout={500} classNames="item">
          <tr className="ds-tabdata">
            <td className="ds-short">{product.name}</td>
            <td className="ds-img">
              {" "}
              <Avatar
                alt={product.name}
                src={`${process.env.REACT_APP_BACKEND_IMG}/${product.image}`}
                sx={{ width: "2vw", height: "2vw" }}
              />
            </td>
            <td className="ds-medium">
              {" "}
              {product.description.slice(0, 22)}...
            </td>
            <td className="ds-short">
              {" "}
              {product.categories.map((category) => {
                return category.name + "  ";
              })}
            </td>
            <td className="ds-short">
              {" "}
              {(product.stats && product.stats.price) || "N/A"}
            </td>
            <td className="ds-short">
              {" "}
              {(product.stats && product.stats.stock + product.stats.format) ||
                "N/A"}
            </td>
            <td className="ds-tabdata-actions">
              {" "}
              <Button onClick={() => showStatusWarningHandler(product.id)}>
                <i className="fa-solid fa-chart-line"></i>
              </Button>
              <Button
                onClick={() => showStatusWarningHandlerUpdate(product.id)} inverse
              >
                <i className="fas fa-cogs "></i>
              </Button>
              <Button
                onClick={() => showStatusWarningHandlerDelete(product.id) } danger
              >
                <i className="fas fa-trash-alt"></i>
              </Button>
            </td>
          </tr>
        </CSSTransition>
      ))}
    </React.Fragment>
  );
};

export default ProductList;
