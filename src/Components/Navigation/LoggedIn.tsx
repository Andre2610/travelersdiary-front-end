import React from "react";
import { NavLink } from "react-router-dom";
import { Flex, Text, Button } from "@chakra-ui/core";
import { useDispatch, useSelector } from "react-redux";
// import { logOut } from "../../store/user/actions";
// import { selectUser } from "../../store/user/selectors";

export default function LoggedIn() {
  //   const dispatch = useDispatch();
  //   const user = useSelector(selectUser);
  return (
    <>
      {/* <Nav.Item style={{ padding: ".5rem 1rem" }}>{user.email}</Nav.Item>
      <Button onClick={() => dispatch(logOut())}>Logout</Button> */}
    </>
  );
}
