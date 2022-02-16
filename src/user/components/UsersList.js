import React, { useState } from "react";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import { Box } from "@mui/system";
import { Input } from "@mui/material";
import { Pagination } from "@mui/material";
import { Avatar } from "@mui/material";
import Modal from "../../shared/components/UIElements/Modal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./UsersList.css";

const UserList = (props) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalId, setModalId] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [userId, setUserId] = useState();

  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2> No Users Found</h2>
        </Card>
      </div>
    );
  }
  const switchStatusHandler = async () => {
    console.log(props.token);
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/setrol/setseller/${userId}`,
        "PATCH",
        null,
        {
          Authorization: "Bearer " + props.token,
        }
      );
    } catch (err) {}
    props.update();
  };
  const showStatusWarningHandler = (id) => {
    setUserId(id);
    setShowConfirmModal(true);
  };
  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
    props.update();
  };

  return (
    <>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Estas seguro de cambiar el rol del usuario?"
        footerClass="place-item_modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              Cancelar
            </Button>
            <Button danger onClick={switchStatusHandler}>
              Actualizar
            </Button>
          </React.Fragment>
        }
      ></Modal>
      {props.items.map((user) => (
        <tr className="ds-tabdata">
          <td>{user.name}</td>
          <td>
            {" "}
            <Avatar
              alt={user.name}
              src={`${process.env.REACT_APP_BACKEND_IMG}/${user.image}`}
              sx={{ width: "2vw", height: "2vw" }}
            />
          </td>
          <td> {user.email}</td>
          <td> {user.dni}</td>
          <td> {user.phone}</td>
          <td> {user.rol.rol}</td>

          <td className="ds-tabdata-actions">
            {" "}
            <Button
              onClick={() => {
                props.user(user.id, true);
              }}
            >
              <i className="fas fa-cogs "></i>
            </Button>
            <Button
              onClick={() => {
                showStatusWarningHandler(user.id);
              }}
            >
              <i class="fa-solid fa-store"></i>
            </Button>
            <Button to={`//user/update`}>
              <i className="fas fa-trash-alt"></i>
            </Button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default UserList;
