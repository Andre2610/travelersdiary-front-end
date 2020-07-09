import React from "react";
import { FaGithub } from "react-icons/fa";
import { Flex, Text, Divider, Link, IconButton } from "@chakra-ui/core";
import "../../Style/GenStyle.scss";

export default function Footer() {
  return (
    <Flex justify="flex-end" m={3} align="center">
      <Text>&#169;Traveler's Diary by Andre Silva </Text>
      <Divider orientation="vertical" />
      <Link
        href="https://github.com/Andre2610/travelersdiary-front-end"
        isExternal
      >
        {/* 
        //@ts-ignore */}
        <IconButton
          icon={FaGithub}
          variantColor="customIcon"
          className="iconBtn"
        />
      </Link>
    </Flex>
  );
}
