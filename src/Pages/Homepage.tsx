import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Trip } from "../Types/model";
import TripCard from "../Components/TripCard";
import { Box } from "@chakra-ui/core";
import { fetchTrips } from "../Store/trips/actions";
import { selectAllTrips } from "../Store/trips/selector";

export default function Homepage() {
  const dispatch = useDispatch();
  const allTrips: Trip[] = useSelector(selectAllTrips);

  useEffect(() => {
    dispatch(fetchTrips());
  }, []);

  return (
    <Box w="100vw" m="auto" bg="orange.200" p="2vh">
      {allTrips.map((trip) => {
        return (
          <Box key={trip.id}>
            <TripCard
              id={trip.id}
              tripTitle={trip.tripTitle}
              posts={trip.posts}
              startDate={trip.startDate}
              endDate={trip.endDate}
            />
          </Box>
        );
      })}
    </Box>
  );
}
