import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../Store/users/selector";
import { Trip } from "../Types/model";
import TripCard from "../Components/TripCard";
import NewTripModal from "../Components/NewTripModal";
import "../Style/MyPage.scss";

import { Flex, Text, Box, Heading } from "@chakra-ui/core";

export default function MyPage() {
  const history = useHistory();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!user.id) {
      //   history.push("/");
    }
  }, [user]);

  if (!user.id) return null;

  //@ts-ignore
  const about = user.about
    .split("\n")
    .map((paragraph, i) => <Text key={i}>{paragraph}</Text>);

  return (
    <Box bg="#B8B08D" w="100vw" top="1" mt="3rem">
      <Flex flexDirection="column" justify="center" w="80vw" m="auto">
        <Box
          w="100%"
          my="3rem"
          bg="blue.100"
          maxH="60vh"
          minH="25vh "
          h="auto"
          position="relative"
        >
          <Heading as="h2" p="1rem" textAlign="center">
            {user.title}
          </Heading>
          <Box mx="3rem" mb="0.5rem">
            <Heading margin="auto" fontSize="1.5rem">
              {user.firstName} {user.lastName}
            </Heading>
          </Box>
          <Box mx="2rem" pb="2rem" h="auto">
            {about}
          </Box>
          {/* <Button
            onClick={() => set_edit(!edit)}
            my="1rem"
            position="absolute"
            bottom="0rem"
            right="1rem"
          >
            Edit
          </Button> */}
        </Box>
        <Flex justify="center">
          <NewTripModal />
        </Flex>

        {user.trips
          .sort((a: Trip, b: Trip) => a.id - b.id)
          .map((trip) => {
            return (
              <Box key={trip.id}>
                <TripCard
                  id={trip.id}
                  tripTitle={trip.tripTitle}
                  posts={trip.posts}
                  startDate={trip.startDate}
                  endDate={trip.endDate}
                  userId={trip.userId}
                />
              </Box>
            );
          })}
      </Flex>
    </Box>
  );
}
