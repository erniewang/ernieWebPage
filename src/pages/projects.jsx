import { DescriptionObjectHolder } from "../componets/contentObject";
import { useState, useEffect } from "react";
export default function Projects() {
    const [phoneMode, setPhoneMode] = useState((window.outerWidth <= 1015 ? true : false));
    
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
        const mediaMode = window.matchMedia("(max-width: 1014px)");
        mediaMode.addEventListener("change", handleMediaChange);
        return () => {
            mediaMode.removeEventListener("change", handleMediaChange);
        };
    }, []);

    return (
      <div>
        <h3>Projects | Applications</h3>
        <DescriptionObjectHolder height={123}>
            <div>
            {/* Wrap the entire conditional (ternary) operator in curly braces */}
            {
                !phoneMode ? (
                // This is the content to render if !phoneMode is true
                <div style={{display: "flex", flexDirection: "row", justifyContent:"space-between"}}>
                    <div style={{display:"flex", flexDirection: "column", justifyContent: "space-between", height: "98%", width: "49.5%", paddingRight: "10px"}}>
                    <DescriptionObjectHolder height={72} width={98}></DescriptionObjectHolder>
                    <DescriptionObjectHolder height={40} width={98}></DescriptionObjectHolder>
                    </div>
                    <div style={{display:"flex", flexDirection: "column", justifyContent: "space-between", height: "98%", width: "47%", paddingRight: "15px"}}>
                    <DescriptionObjectHolder height={42} width={98}></DescriptionObjectHolder>
                    <DescriptionObjectHolder height={70} width={98}></DescriptionObjectHolder>
                    </div>
                </div>
                ) : (
                <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between", paddingRight: "10px"}}>
                    <DescriptionObjectHolder height={30}></DescriptionObjectHolder>
                    <DescriptionObjectHolder height={20}></DescriptionObjectHolder>
                    <DescriptionObjectHolder height={20}></DescriptionObjectHolder>
                    <DescriptionObjectHolder height={30}></DescriptionObjectHolder>
                </div>
                )
            }
            </div>
                    </DescriptionObjectHolder>
      </div>
    );
  }