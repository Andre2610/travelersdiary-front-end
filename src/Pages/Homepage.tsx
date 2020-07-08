import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Trip } from "../Types/model";
import TripCard from "../Components/TripCard";
import { Box } from "@chakra-ui/core";
import { fetchTrips } from "../Store/trips/actions";
import { selectAllTrips } from "../Store/trips/selector";
import { useHistory } from "react-router-dom";

export default function Homepage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allTrips: Trip[] = useSelector(selectAllTrips);

  useEffect(() => {
    dispatch(fetchTrips());
    history.push("/");
  }, [dispatch]);

  return (
    <Box w="100vw" m="auto" bg="blackAlpha.300" p="2vh" top="1" mt="3rem">
      {allTrips
        .sort((a: Trip, b: Trip) => a.id - b.id)
        .map((trip) => {
          const sortedPosts = trip.posts.sort((a, b) => {
            return b.id - a.id;
          });
          const post = [{ ...sortedPosts[0] }];
          return (
            <Box
              key={trip.id}
              rounded="lg"
              w="80%"
              m="auto"
              p="15px"
              my="3vh"
              border="2px solid gray"
              overflow="hidden"
            >
              <TripCard
                id={trip.id}
                tripTitle={trip.tripTitle}
                posts={post}
                startDate={trip.startDate}
                endDate={trip.endDate}
                userId={trip.userId}
              />
            </Box>
          );
        })}
    </Box>
  );
}
