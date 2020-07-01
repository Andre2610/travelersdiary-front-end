import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { selectIdTrip } from "../Store/trips/selector";
import { Trip, Picture } from "../model";

export default function TripDetails() {
  const { id } = useParams();
  const oneTrip: Trip = useSelector(selectIdTrip(id));
  console.log("what does one trip select", oneTrip);
  if (oneTrip) {
    return <div>{oneTrip.tripTitle}</div>;
  }
  return null;
}
