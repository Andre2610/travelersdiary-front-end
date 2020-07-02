import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSpecificTrip } from "../Store/trips/actions";
import { selectIdTrip } from "../Store/trips/selector";
import { Trip, Picture } from "../Types/model";
import Slider from "../Components/slider";
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

export default function TripDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const oneTrip: Trip = useSelector(selectIdTrip(id));
  console.log("what does one trip select", oneTrip);

  function postsRender(title: string, content: string, pictures: Picture[]) {
    if (pictures.length > 0) {
      return (
        <Flex wrap="wrap" flexDirection="row" justify="space-evenly" w="100%">
          <Heading as="h3" size="sm" w="95%" m="auto" mb="1.5rem">
            {title}
          </Heading>
          <Text w="45%">{content}</Text>
          <Box float="right" w="45%">
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

  useEffect(() => {
    if (!oneTrip) {
      dispatch(fetchSpecificTrip(id));
    }
  }, [id]);

  if (oneTrip) {
    return (
      <Flex flexDirection="column" justify="center" w="80vw" m="auto">
        <Flex w="100%" justify="space-evenly" my="3rem" textAlign="center">
          <Box w="50%">
            <Heading as="h2" mb="2rem">
              {oneTrip.tripTitle}
            </Heading>
            <Tabs variant="soft-rounded" variantColor="cyan">
              <Flex w="100%" flexDirection="row" justify="space-around">
                <TabList d="row" alignSelf="left" w="35%">
                  {oneTrip.posts.map((post) => {
                    return (
                      <Tab h="4rem" w="95%">
                        {post.id}
                      </Tab>
                    );
                  })}
                </TabList>
                <TabPanels float="right" w="60%">
                  {oneTrip.posts.map((post) => {
                    return <Slider pictures={post.pictures} />;
                  })}
                </TabPanels>
              </Flex>
            </Tabs>
          </Box>
          <Box w="50%">TODO: Map with pins on locations</Box>
        </Flex>

        {oneTrip.posts.map((post) => {
          const { id, title, content, latitude, longitude, pictures } = post;
          return (
            <Box
              key={id}
              bg="blue.100"
              w="60vw"
              //   maxH="35vh"
              m="auto"
              p="15px"
              my="3vh"
              border="3px solid black"
              overflow="hidden"
            >
              <Box color="black.500">
                {postsRender(title, content, pictures)}
              </Box>
              <Flex justify="space-around" pt="1rem">
                {/* <Button
                  className="visitTrip"
                  bg="red.500"
                  color="blue.100"
                  w="20%"
                  //   onClick={(e) => visitTripOnClickHandler(id)}
                >
                  Read more!
                </Button> */}
              </Flex>
            </Box>
          );
        })}
      </Flex>
    );
  }
  return null;
}
