import { ContentObject, ContentObjectHolder, DescriptionObjectHolder } from "../componets/contentObject";
import { useEffect, useState } from "react";
import { ImageKitImage } from "../imageKit";

function WebKitImageHolder(height) {
  const start = 1010;
  const end = 1020;

  const items = [];
  for (let i = start; i <= end; i++) {
    items.push(
        <ImageKitImage key={i} image_name={`/speedRun2/${i}.jpg`} />
    );
  }

  return (
    <div className="ContentObjectHolder" style={{ height: `${height}vh`, width:"100%" }}>
      {items}
    </div>
  );
}


export default function Photography() {
    return (
      <div>
        <h2>Photography</h2>
        <p>I have traveled to over 20 countries, most of them in europe and china. My photograhy gear is just a phone camera for now. I am not well versed in photographer technology and scientifics, however I wish to learn them and have higher controll over my photographs in the future. Check out my photos!</p>
        <WebKitImageHolder height={50}></WebKitImageHolder>
      </div>

    );
  }
  