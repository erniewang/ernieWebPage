import { Image as ImageKitComponent } from '@imagekit/react'; // Renamed to ImageKitComponent

function ImageKitImage(image_name) {
  console.log("getting image");
  return (
    <ImageKitComponent
      urlEndpoint="https://ik.imagekit.io/ernestwangphotos"
      src={image_name.image_name}
      width={500}
      height={500}
      alt="Picture of the author"
    />
  );
}

export {ImageKitImage};