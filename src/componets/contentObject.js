import "./componets.css";

function ContentObject(text) {
    return <div></div>
}

function ContentObjectHolder({ height, images }) {
    return (
      <div className="ContentObjectHolder" style={{ maxHeight: height + "%" }}>
        {images.map((img, index) => (
          <img
            key={index}
            src={img.src}
            alt=""
            className="Img"
          />
        ))}
      </div>
    );
  }

export {ContentObject, ContentObjectHolder};