import "./componets.css";
import { useEffect, useState } from "react";

function ContentObject({image, neighbors, id, mode}) {
    const widthD = neighbors.find(item => item.index === id).ratio;
    return <div className="Img" style={{width: (!mode ? (widthD * 100) + "%" : "100%"), backgroundImage: `url(${image})`,}}></div>
}

function ContentObjectHolder({ height, images, range }) {

    const [phoneMode, setPhoneMode] = useState((window.outerWidth <= 768 ? true : false));

    function handleMediaChange(e) {
        if (e.matches) {
            setPhoneMode(true);
        } else {
            // Media query no longer matches
            setPhoneMode(false);
        }
    }

// Attach listener
    useEffect(() => {
        console.log("changed");
        const mediaMode = window.matchMedia("(max-width: 768px)");
        mediaMode.addEventListener("change", handleMediaChange);
        return () => {
            mediaMode.removeEventListener("change", handleMediaChange);
        };
    }, []); // <- empty dependency array = run only once


    images = images.slice(range[0],range[1]);
    const imageNormalized = images.map((image, index) => ({
        src: image.src,
        w: (1 / image.height) * image.width,
        h: 1,
        index: index // Optional here, but could be useful later
    }));
    
    const totalWidth = imageNormalized.reduce((a, img) => a + img.w, 0);
    const ratioNW = 1 / totalWidth;
    
    const neighbors = imageNormalized.map((img, index) => ({
        src: img.src,
        ratio: ratioNW * img.w,
        index: index // 👈 Included here
    }));

    //console.log(neighbors.reduce((a, n) => a + n.ratio, 0));

    return (
      <div className="ContentObjectHolder" style={{ height: height + "vh" }}>
        {images.map((img,key) => (
          <ContentObject image={img.src} key={key} id={key} neighbors={neighbors} mode={phoneMode}></ContentObject>
        ))}
      </div>
    );
}

function DescriptionObjectHolder({height}) {
    return (
        <div className="ContentObjectHolder" style={{ height: height + "vh" }}>
        </div>
    );
}

export {ContentObject, ContentObjectHolder, DescriptionObjectHolder};