import React from "react";
import { Trip, Picture } from "../model";
import { Flex, Text, Box, Heading, Image } from "@chakra-ui/core";
import { Carousel } from "react-responsive-carousel";
import Slider from "./slider";

export default function TripCard(props: Trip) {
  const { id, tripTitle, posts, startDate, endDate } = props;

  function postsRender(title: string, content: string, pictures: Picture[]) {
    if (pictures.length > 0) {
      return (
        <Flex wrap="wrap" flexDirection="row">
          <Heading as="h3" size="sm" w="100%" m="auto">
            {title}
          </Heading>
          <Text w="50%">{content}</Text>
          <Box float="right" w="50%">
            <Slider pictures={pictures} />
          </Box>
        </Flex>
      );
    }
    return (
      <>
        <Heading as="h3" size="sm" w="100%" m="auto">
          {title}
        </Heading>
        <Text w="100%">{content}</Text>
      </>
    );
  }

  return (
    <Box
      key={id}
      bg="blue.100"
      w="60vw"
      maxH="100vh"
      m="auto"
      p="15px"
      my="3vh"
      border="3px solid black"
      overflow="scroll"
    >
      <Heading as="h2" size="md" bg="white.100">
        {tripTitle}
      </Heading>
      <Text bg="white.500" mb="1rem">
        Trip started on: {startDate}
        {endDate ? `and ended on ${endDate}` : null}
      </Text>
      {posts.map((post) => {
        const { id, title, content, latitude, longitude, pictures } = post;
        return (
          <Box color="black.500" key={id}>
            {postsRender(title, content, pictures)}
          </Box>
        );
      })}
    </Box>
  );
}
