import React from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../Store/users/actions";
import { Button } from "@chakra-ui/core";
import "../../Style/Navigation.scss";

export default function Logout() {
  const dispatch = useDispatch();
  return (
    <>
      <Button onClick={() => dispatch(logOut())} minW="7vw" className="navbtn">
        Logout
      </Button>
    </>
  );
}
