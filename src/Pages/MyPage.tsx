import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserWithStoredToken } from "../Store/users/actions";
import { selectUser } from "../Store/users/selector";

import {
  Flex,
  Text,
  Box,
  Heading,
  Image,
  Button,
  TabList,
  Tab,
  Tabs,
  TabPanel,
  TabPanels,
} from "@chakra-ui/core";

export default function MyPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!user.id) {
      //   history.push("/");
    }
  }, [user]);
  return (
    <Flex flexDirection="column" justify="center" w="80vw" m="auto">
      <Box w="100%" my="3rem" bg="blue.100" maxH="60vh" h="auto">
        <Text p="2" textAlign="center">
          <Heading as="h2" mb="1rem">
            {user.title}
          </Heading>
        </Text>
        <Box alignSelf="left" ml="3rem" mb="0.5rem">
          <Heading as="h3">
            {user.firstName} {user.lastName}
          </Heading>
        </Box>
        <Box ml="2rem">{user.about}</Box>
      </Box>
    </Flex>
  );
}
