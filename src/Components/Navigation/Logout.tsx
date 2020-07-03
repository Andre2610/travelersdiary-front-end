import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../Store/users/actions";
import { selectUser } from "../../Store/users/selector";
import { Button } from "@chakra-ui/core";

export default function Logout() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  return (
    <>
      <Button onClick={() => dispatch(logOut())} minW="7vw">
        Logout
      </Button>
    </>
  );
}
