import { ContentObject, ContentObjectHolder, DescriptionObjectHolder } from "../componets/contentObject";
import { fetchSingleFile, fetchFilesRange } from "../googleDriveApi";
import { useState,useEffect } from "react";
import { imagesLoad, loadImageDrive } from "../componets/helperFunctions";

let images = fetchFilesRange(115,130);

export default function Photography() {

    const [imageData, setImageData] = useState([]); //has a state for loading the images 


    useEffect(() => {
    (async function () {
        const loaded = [];
        for (const element of images) {
            const img = await imagesLoad(element, true);
            loaded.push(img);
        }
        setImageData(loaded);
    })();
    }, []);


    return (
      <div>
        <h2>Photography</h2>
        <p>I have traveled to over 20 countries, most of them in europe and china. My photograhy gear is just a phone camera for now. I am not well versed in photographer technology and scientifics, however I wish to learn them and have higher controll over my photographs in the future. Check out my photos!</p>
        <ContentObjectHolder height={48} images={imageData} range={[0,15]} width={98}></ContentObjectHolder>
      </div>

    );
  }
  