import "./componets.css";
import { useEffect, useState } from "react";
import { loadImage } from "./helperFunctions";
import ImageKit from "imagekit-javascript";

var imagekit = new ImageKit({
    urlEndpoint: "https://ik.imagekit.io/ernestwangphotos"
});

// ContentObject: displays a single image, lazy-loads high-res
function ContentObject({ image, neighbors, id, mode, spreadFactor=1, imageKit }) {
  const [largeImageLoaded, setLargeImageLoaded] = useState(image);

  useEffect(() => {
    (async () => {
      if (!imageKit) {
        const largeImageUrl = image.replace("smaller_images/", "").replace("_10X", "");
        await loadImage(largeImageUrl);
        setLargeImageLoaded(largeImageUrl);
      }
      else {
        const fileName = image.replace("assets/images/speedRun/","");
        const imageURL = imagekit.url({
            path: `/speedRun2/${fileName}`,
            urlEndpoint: "https://ik.imagekit.io/ernestwangphotos",
        });
        await loadImage(imageURL);
        setLargeImageLoaded(imageURL);

      }
    })();
  }, []);

  const widthD = neighbors.find(item => item.index === id).ratio;
  return (
    <div
      className="Img"
      style={{
        width: !mode ? (widthD * 100 * spreadFactor) + "%" : (100 * spreadFactor).toString()+"%",
        backgroundImage: `url(${largeImageLoaded})`
      }}
    />
  );
}

// ContentObjectHolder: holds & sizes images responsively
function ContentObjectHolder({ height, images, range, width ,spreadFactor = 1, imageKit=false }) {
  const [phoneMode, setPhoneMode] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const handler = e => setPhoneMode(e.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  const displayImages = images.slice(range[0], range[1]);
  const imageNormalized = displayImages.map((img, i) => ({
    src: img.src,
    w: img.width / img.height,
    h: 1,
    index: i
  }));
  const totalWidth = imageNormalized.reduce((a, img) => a + img.w, 0);
  const ratioNW = 1 / totalWidth;
  const neighbors = imageNormalized.map(img => ({
    src: img.src,
    ratio: ratioNW * img.w,
    index: img.index
  }));

  return (
    <div>
    <div className="ContentObjectHolder" style={{ height: `${height}vh`, width: `${width}%` }}>
      {displayImages.map((img, key) => (
        <ContentObject
          image={img.src}
          key={key}
          id={key}
          neighbors={neighbors}
          mode={phoneMode}
          spreadFactor={spreadFactor}
          imageKit={imageKit}
        />
      ))}
    </div>
    </div>
  );
}

// DescriptionObjectHolder: just a wrapper for layout
function DescriptionObjectHolder({ height, children, width }) {
  return (
    <div className="DescriptionObjectHolder" style={{ height: `${height}vh`, width: `${width}%` }}>
      {children}
    </div>
  );
}

export { ContentObject, ContentObjectHolder, DescriptionObjectHolder };
