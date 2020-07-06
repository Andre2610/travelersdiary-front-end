import React from "react";
import { useHistory } from "react-router-dom";
import { Trip, Picture } from "../Types/model";
import {
  Flex,
  Text,
  Box,
  Heading,
  Image,
  Button,
  TabPanels,
  TabPanel,
  Tab,
  TabList,
  Tabs,
} from "@chakra-ui/core";
import Slider from "./slider";
import "../Style/TripCard.scss";

export default function TripCard(props: Trip) {
  const { id, tripTitle, posts, startDate, endDate } = props;
  const history = useHistory();

  function postsRender(title: string, content: string, pictures: Picture[]) {
    const paragraphs = content.split("\n");
    if (pictures.length > 0) {
      return (
        <Flex wrap="wrap" flexDirection="row" justifyContent="space-around">
          <Heading as="h3" size="sm" w="100%" m="auto" mt="1rem" mb="0.5rem">
            {title}
          </Heading>
          <Box w="40%">
            {paragraphs.map((paragraph, i) => (
              <Text key={i} my="0.5rem">
                {paragraph}
              </Text>
            ))}
          </Box>
          <Box float="right" w="40%">
            <Slider pictures={pictures} />
          </Box>
        </Flex>
      );
    }
    return (
      <Flex wrap="wrap" flexDirection="row" justifyContent="space-around">
        <Heading as="h3" size="sm" w="100%" m="auto" mt="1rem" mb="0.5rem">
          {title}
        </Heading>
        <Box width="90%" m="auto">
          {paragraphs.map((paragraph, i) => (
            <Text key={i} my="0.5rem">
              {paragraph}
            </Text>
          ))}
        </Box>
      </Flex>
    );
  }

  function visitTripOnClickHandler(id: number) {
    history.push(`/trip/${id}`);
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
      border="3px solid olive"
      overflow="hidden"
    >
      <Heading className="tripTitle">{tripTitle}</Heading>
      <Text bg="white.500" mb="1rem">
        Trip started on: {startDate}
        {endDate ? ` and ended on ${endDate}` : null}
      </Text>
      {posts
        .sort((a, b) => b.id - a.id)
        .map((post) => {
          const { id, title, content, latitude, longitude, pictures } = post;
          return (
            <Box color="black.500" key={id}>
              {postsRender(title, content, pictures)}
            </Box>
          );
        })}
      <Flex justify="space-around" pt="1rem">
        <Button
          className="visitTripBtn"
          minW="20%"
          onClick={(e) => visitTripOnClickHandler(id)}
        >
          Check out this trip!
        </Button>
      </Flex>
    </Box>
  );
}
