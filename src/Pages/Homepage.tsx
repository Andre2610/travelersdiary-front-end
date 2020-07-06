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
    <Box w="100vw" m="auto" bg="#B8B08D" p="2vh" top="1" mt="3rem">
      {allTrips
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
    </Box>
  );
}
