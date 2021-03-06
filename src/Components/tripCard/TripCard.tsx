import React from "react";
import { useHistory } from "react-router-dom";
import { Trip, Picture, Post } from "../../Types/tripTypes";
import { Flex, Text, Box, Heading, Button, Divider } from "@chakra-ui/core";
import Slider from "../slider";
import "../../Style/GenStyle.css";
import "./TripCard.css";

export default function TripCard(props: Trip) {
  const { id, tripTitle, posts, startDate, endDate } = props;
  const history = useHistory();

  function postsRender(title: string, content: string, pictures: Picture[]) {
    const paragraphs = content ? content.split("\n") : [];
    if (pictures.length > 0) {
      return (
        <Flex wrap="wrap" flexDirection="row" justifyContent="space-around">
          <Heading as="h3" size="sm" w="95%" m="auto" mt="1rem" mb="0.5rem">
            {title}
          </Heading>
          <Box w="45%">
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
        <Heading as="h3" size="sm" w="95%" m="auto" mt="1rem" mb="0.5rem">
          {title}
        </Heading>
        <Box width="95%" m="auto">
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
    <Box key={id}>
      <Heading className="tripTitle" textAlign="center">
        {tripTitle}
      </Heading>
      <Text bg="white.500" mb="1rem" textAlign="center">
        Trip started on: {startDate}
        {endDate ? ` and ended on ${endDate}` : null}
      </Text>

      {posts
        ? posts
            .sort((a, b) => b.id - a.id)
            .map((post) => {
              const { id, title, content, pictures } = post;
              return (
                <Box key={id}>
                  <Box>{postsRender(title, content, pictures)}</Box>
                  <Divider borderColor="gray.500" py={2} />
                </Box>
              );
            })
        : null}
      <Flex justify="space-around" pt="1rem">
        <Button
          variantColor="customBtn"
          className="navbtn"
          minW="20%"
          onClick={(e) => visitTripOnClickHandler(id)}
        >
          Explore this trip!
        </Button>
      </Flex>
    </Box>
  );
}
