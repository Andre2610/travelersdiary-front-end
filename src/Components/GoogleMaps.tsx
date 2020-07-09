import React, { useRef, useState } from "react";
import { Post, DefaultMarker } from "../Types/model";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import { googleAPIkey } from "../config/constants";
import { findAllByLabelText } from "@testing-library/react";

const MyMapComponent = withScriptjs(
  withGoogleMap((props: { posts: Post[]; moveToMarker: DefaultMarker }) => {
    const { lat, lng, address, flag } = props.moveToMarker;
    const center = { lat: lat, lng: lng };
    // const [center, setCenter] = useState({ lat: lat, lng: lng });
    const [infoOpen, setInfoOpen] = useState(false);
    const refMap = useRef(null);
    console.log("whats my center", center);
    return (
      <GoogleMap
        ref={refMap}
        defaultZoom={8}
        defaultCenter={{
          lat: lat ? lat : props.posts[0].latitude,
          lng: lng ? lng : props.posts[0].longitude,
        }}
        center={center}
      >
        {props.posts.map((post) => {
          const { latitude, longitude } = post;
          return (
            <Marker
              key={post.id}
              position={{ lat: latitude, lng: longitude }}
              title={post.title}
              animation={google.maps.Animation.DROP}
              // @ts-ignore
              // onClick={() => {
              //   null;
              // }}
            />
          );
        })}
        {/* {selectedCenter && (
          <InfoWindow
            onCloseClick={() => {
              set_selectedCenter("");
            }}
            position={{
              lat: selectedCenter.latitude,
              lng: selectedCenter.longitude,
            }}
          ></InfoWindow>
        )} */}
      </GoogleMap>
    );
  })
);

export default (props: { posts: Post[]; moveToMarker: DefaultMarker }) => {
  console.log("move", props.moveToMarker);
  return (
    <MyMapComponent
      //@ts-ignore
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${googleAPIkey}`}
      //@ts-ignore
      loadingElement={<div style={{ height: `100%`, width: `100%` }} />}
      //@ts-ignore
      containerElement={
        <div
          style={{
            height: `100%`,
            width: `100%`,
            alignSelf: "center",
            justifySelf: "center",
          }}
        />
      }
      //@ts-ignore
      mapElement={<div style={{ height: `50vh`, width: `63vw` }} />}
      //@ts-ignore
      posts={props.posts}
      moveToMarker={props.moveToMarker}
    />
  );
};
