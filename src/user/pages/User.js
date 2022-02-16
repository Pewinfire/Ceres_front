import React, { useEffect, useState } from "react";
import Button from "../../shared/components/FormElements/Button";
import { Box } from "@mui/system";
import { Input } from "@mui/material";
import { Pagination } from "@mui/material";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import UsersList from "../components/UsersList";
import UpdateUser from "../components/UpdateUser";
import "../components/UsersList.css";
const Users = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();
  const [update, setUpdate] = useState(true);
  const [search, setSearch] = useState("user");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [size, setSize] = useState(5);
  const [sort, setSort] = useState("name");
  const [columna, setColumna] = useState("name");
  const [updateUser, setUpdateUser] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState();
  const [dir, setDir] = useState(1);

  const selectPage = (event, value) => {
    setPage(value);
  };
  const handleTextFieldKeyDown = (event) => {
    switch (event.key) {
      case "Enter":
        if (event.target.value) {
          setSearch(event.target.value);
        } else {
          setSearch("user");
        }
        break;
      case "Escape":
        setSearch("user");
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    const fetchUsers = async () => {
      //useEffect no quiere una promesa, no usar async en el hook, meter el fetch en una funcion async

      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/getall/${
            page - 1
          }/${size}/${search}/${sort}/${dir}`,
          "GET",
          null,
          {
            Authorization: "Bearer " + props.token,
          }
        ); // solo necesita url, lo demas viene vacio y hace get predeterminado
        setLoadedUsers(responseData.users);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest, update]); // allows to run certain code only when certain dependencies change (first argument),  . Second arg = array of dependencies , data that needs to change for this return. recarga cada vez que se hace una request

  const updateFetch = () => {
    setUpdate(update ? false : true);
  };
  const updateUserButton = (userid , value) => {
    setUserToUpdate(userid);
    setUpdateUser(value);
  };
  const updateOrder = (sort) => {
    setSort(sort);
    setDir(dir === 1 ? -1 : 1);
    updateFetch();
  };
  return (
    <div>
      <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && (
          <div className="center">
            <LoadingSpinner />
          </div>
        )}
        {!updateUser && (
          <>
            <table className="ds-table">
              <tr className="ds-table-head">
                <th className="firstChild">
                  Usuario
                  <Button
                    onClick={() => updateOrder("name")}
                    dClassName="dir-button"
                  >
                    {(dir === 1 && <i className="fas fa-sort-up"></i>) || (
                      <i className="fas fa-sort-down"></i>
                    )}
                  </Button>
                </th>
                <th>Imagen</th>
                <th>
                  Email
                  <Button
                    onClick={() => updateOrder("email")}
                    dClassName="dir-button"
                  >
                    {(dir === 1 && <i className="fas fa-sort-up"></i>) || (
                      <i className="fas fa-sort-down"></i>
                    )}
                  </Button>
                </th>
                <th>
                  DNI
                  <Button
                    onClick={() => updateOrder("dni")}
                    dClassName="dir-button"
                  >
                    {(dir === 1 && <i className="fas fa-sort-up"></i>) || (
                      <i className="fas fa-sort-down"></i>
                    )}
                  </Button>
                </th>
                <th>
                  Telefono
                  <Button
                    onClick={() => updateOrder("phone")}
                    dClassName="dir-button"
                  >
                    {(dir === 1 && <i className="fas fa-sort-up"></i>) || (
                      <i className="fas fa-sort-down"></i>
                    )}
                  </Button>
                </th>
                <th className="th-order">
                  Rol{" "}
                  <Button
                    onClick={() => updateOrder("rol.rol")}
                    dClassName="dir-button"
                  >
                    {(dir === 1 && <i className="fas fa-sort-up"></i>) || (
                      <i className="fas fa-sort-down"></i>
                    )}
                  </Button>
                </th>
                <></>

                <th className="lastChild">Acciones</th>
              </tr>
              {!isLoading && loadedUsers && (
                <UsersList
                  items={loadedUsers}
                  token={props.token}
                  user={updateUserButton}
                  update={updateFetch}
                  dir={dir}
                />
              )}
            </table>
            <Box
              className="search-boxx"
              sx={{ display: "flex", alignItems: "flex-end" }}
            >
              <Input
                fullWidth
                label="Buscar"
                id="fullWidth"
                className="searchx"
                /*   inputProps={{ style: { fontSize: 30 } }} // font size of input text
              inputlabelprops={{ style: { fontSize: 30 } }} */
                placeholder="  Buscar"
                onKeyDown={handleTextFieldKeyDown}
              />
            </Box>
            <Pagination
              count={totalPages}
              page={page}
              className="paginationx"
              color="success"
              onChange={selectPage}
              size="large"
            />
          </>
        )}
        {updateUser && userToUpdate && (
          <UpdateUser
            token={props.token}
            user={userToUpdate}
            close={updateUserButton}
          />
        )}
      </React.Fragment>
    </div>
  );
};

export default Users;
