import React from "react";
import { Post } from "../Types/model";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const MyMapComponent = withScriptjs(
  withGoogleMap((props: { posts: Post[] }) => {
    console.log("my map props", props.posts);
    return (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{
          lat: props.posts[0].latitude,
          lng: props.posts[0].longitude,
        }}
      >
        {props.posts.map((post) => {
          const { latitude, longitude } = post;
          return <Marker position={{ lat: latitude, lng: longitude }} />;
        })}
      </GoogleMap>
    );
  })
);

export default (props: Post[]) => {
  return (
    <MyMapComponent
      //@ts-ignore
      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
      //@ts-ignore
      loadingElement={<div style={{ height: `100%` }} />}
      //@ts-ignore
      containerElement={
        <div
          style={{ height: `95%`, alignSelf: "center", justifySelf: "center" }}
        />
      }
      //@ts-ignore
      mapElement={<div style={{ height: `100%` }} />}
      //@ts-ignore
      posts={props.posts}
    />
  );
};
