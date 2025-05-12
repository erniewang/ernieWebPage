import "./componets.css";
function ContentObject(text) {
    return <div></div>
}

function ContentObjectHolder({height,children}) {
    return <div className="ContentObjectHolder" style={{height: height + "%"}}>{children}</div>
}

export {ContentObject, ContentObjectHolder};