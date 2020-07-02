import React, { useRef, useState } from "react";
import { Post, DefaultMarker } from "../Types/model";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { googleAPIkey } from "../config/constants";
require("dotenv").config();
const api = process.env.GOOGLE_MAPS_API_KEY;

const MyMapComponent = withScriptjs(
  withGoogleMap((props: { posts: Post[]; moveToMarker: DefaultMarker }) => {
    const { lat, lng } = props.moveToMarker;
    const [center, setCenter] = useState({ lat: lat, lng: lng });
    const refMap = useRef(null);
    // console.log(`my lat ${lat} and my lng ${lng}`, typeof lat);

    return (
      <GoogleMap
        ref={refMap}
        defaultZoom={8}
        defaultCenter={{
          lat: lat ? lat : props.posts[0].latitude,
          lng: lng ? lng : props.posts[0].longitude,
        }}
      >
        {props.posts.map((post) => {
          const { latitude, longitude } = post;
          return (
            <Marker
              key={post.id}
              position={{ lat: latitude, lng: longitude }}
            />
          );
        })}
      </GoogleMap>
    );
  })
);

export default (props: { posts: Post[]; moveToMarker: DefaultMarker }) => {
  console.log("Whats my GapiKey", api);
  return (
    <MyMapComponent
      //@ts-ignore
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDuG4OWXClcdlTOrb8LgkulwasOEUJ9I3o`}
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
      moveToMarker={props.moveToMarker}
    />
  );
};
