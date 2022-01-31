import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import { Avatar } from "@mui/material";
import "./UsersList.css";

const UserList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2> No Users Found</h2>
        </Card>
      </div>
    );
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="Lista-H">Usuario</TableCell>
            <TableCell className="Lista-H">Imagen</TableCell>
            <TableCell align="right" className="Lista-H">
              Email
            </TableCell>
            <TableCell align="right" className="Lista-H">
              DNI&nbsp;
            </TableCell>
            <TableCell align="right" className="Lista-H">
              Telefono&nbsp;
            </TableCell>
            <TableCell align="right" className="Lista-H">
              Acciones&nbsp;
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.items.map((user) => (
            <TableRow
              key={user.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" className="Lista">
                {user.name} {user.lastname}
              </TableCell>
              <TableCell align="right" className="Lista">
                <Avatar
                  alt={user.name}
                  src={`${process.env.REACT_APP_BACKEND_IMG}/${user.image}`}
                  sx={{ width: "2vw", height: "2vw" }}
                />
              </TableCell>
              <TableCell align="right" className="Lista">
                {user.email}
              </TableCell>
              <TableCell align="right" className="Lista">
                {user.dni}
              </TableCell>
              <TableCell align="right" className="Lista">
                {user.phone}
              </TableCell>
              <TableCell align="right" className="Lista">
                <Button to={`/${user.id}/user/update`}>
                  <i className="fas fa-cogs "></i>
                </Button>{" "}
                <Button to={`/${user.id}/user/update`}>
                  <i class="fas fa-trash-alt"></i>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserList;
