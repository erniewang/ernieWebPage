import { ContentObject, ContentObjectHolder, DescriptionObjectHolder } from "../componets/contentObject";
import { getMyOneDriveFiles } from "../onedriveAPI";

export default function Photography() {
    return (
      <div>
        <button onClick={getMyOneDriveFiles}>test onedrive</button>
        <h2>Photography</h2>
        <p>I have traveled to over 20 countries, most of them in europe and china. My photograhy gear is just a phone camera for now. I am not well versed in photographer technology and scientifics, however I wish to learn them and have higher controll over my photographs in the future. Check out my photos!</p>
        <DescriptionObjectHolder height={43}></DescriptionObjectHolder>
      </div>

    );
  }
  