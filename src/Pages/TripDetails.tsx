import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSpecificTrip } from "../Store/trips/actions";
import { selectIdTrip } from "../Store/trips/selector";
import { Trip, Picture } from "../Types/model";

export default function TripDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const oneTrip: Trip = useSelector(selectIdTrip(id));
  console.log("what does one trip select", oneTrip);

  useEffect(() => {
    if (!oneTrip) {
      dispatch(fetchSpecificTrip(id));
    }
  }, [id]);

  if (oneTrip) {
    return <div>{oneTrip.tripTitle}</div>;
  }
  return null;
}
