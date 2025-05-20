import "./componets.css";
import { useEffect, useState } from "react";
import { loadImage } from "./helperFunctions";

// ContentObject: displays a single image, lazy-loads high-res
function ContentObject({ image, neighbors, id, mode }) {
  const [largeImageLoaded, setLargeImageLoaded] = useState(image);

  useEffect(() => {
    (async () => {
      const largeImageUrl = image.replace("smaller_images/", "").replace("_10X", "");
      await loadImage(largeImageUrl);
      setLargeImageLoaded(largeImageUrl);
    })();
  }, []);

  const widthD = neighbors.find(item => item.index === id).ratio;
  return (
    <div
      className="Img"
      style={{
        width: !mode ? (widthD * 100) + "%" : "100%",
        backgroundImage: `url(${largeImageLoaded})`
      }}
    />
  );
}

// ContentObjectHolder: holds & sizes images responsively
function ContentObjectHolder({ height, images, range, width }) {
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
    <div className="ContentObjectHolder" style={{ height: `${height}vh`, width: `${width}%` }}>
      {displayImages.map((img, key) => (
        <ContentObject
          image={img.src}
          key={key}
          id={key}
          neighbors={neighbors}
          mode={phoneMode}
        />
      ))}
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
