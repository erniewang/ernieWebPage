import { ContentObject, ContentObjectHolder } from "../componets/contentObject";

export default function Ernie() {
    return (
      <div>
        <h3>Ernie Wang</h3>
        <p>Hi. I am Ernie. I am a Software Developer and Jazz Musician who loves to build shit. Anything honesty, I just love creating anything off the top of my head. I currently reside in Evanston IL, and my hometown is in Plano TX.
            Since my childhood I loved drawing, legos, clay pottery, minecraft world building. Check out my various projects, experience, in the projects section!
        </p>
        <p>
        I also love design and photography, and love traveling and being the most annoying tourist (yes, i am worse than those Chinese and Korean tourists. My photos within a week of travel are about 5 GB). Check out my photos in the photos section and here are some photos of myself!
        </p>
        <ContentObjectHolder height={70}></ContentObjectHolder>
      </div>
    );
  }
  