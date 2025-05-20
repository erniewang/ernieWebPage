import { ContentObject, ContentObjectHolder, DescriptionObjectHolder } from "../componets/contentObject";
import { useEffect, useState } from "react";
import { imagesLoad } from "../componets/helperFunctions";


const imageSRC = (Array.from({ length: 1100 - 1090 + 1 }, (_, i) => 1010 + i)).map((x) => x.toString());

export default function Photography() {

    const [imageData, setImageData] = useState([]); //has a state for loading the images 

    useEffect(() => {
        (async function () {
            const loaded = await imagesLoad(imageSRC, true);
            setImageData(loaded);
        })(); 
    }, []);

    return (
      <div>
        <h2>Photography</h2>
        <p>I have traveled to over 20 countries, most of them in europe and china. My photograhy gear is just a phone camera for now. I am not well versed in photographer technology and scientifics, however I wish to learn them and have higher controll over my photographs in the future. Check out my photos!</p>
        <ContentObjectHolder height={40} width={97} images={imageData} range={[0,-1]} spreadFactor={4.5} imageKit={true}></ContentObjectHolder>
      </div>

    );
  }
  