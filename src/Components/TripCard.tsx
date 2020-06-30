import React from "react";
import { Trip } from "../model";

export default function TripCard(props: Trip) {
  const { id, tripTitle, posts, startDate, endDate } = props;
  return (
    <div key={id}>
      <h2>{tripTitle}</h2>
      <p>
        Trip started on: {startDate}
        {endDate ? `and ended on ${endDate}` : null}
      </p>
      {posts.map((post) => {
        const { id, title, content, latitude, longitude } = post;
        return (
          <div key={id}>
            <h3>{title}</h3>
            <p>{content}</p>
          </div>
        );
      })}
    </div>
  );
}
