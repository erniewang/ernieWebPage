import { useState, useEffect } from "react";
import { ContentObject, ContentObjectHolder } from "../componets/contentObject";
import { loadImage, imagesLoad } from "../componets/helperFunctions";

const images = ["salzburg", "gdansk","jacksons", "hrvatska", "train2", "train3", "brasov"];

export default function Ernie() {

    const [imageData, setImageData] = useState([]); //has a state for loading the images 

    useEffect(() => {
        (async function () {
            const loaded = await imagesLoad(images, false);
            setImageData(loaded);
        })(); 
    }, []);

      
    return (
      <div>
        <h3>
            Ernie Wang
            <a href="https://www.youtube.com/@erniewang399" target="_blank" rel="noopener noreferrer" style={{ marginLeft: 8, fontSize: '0.8em' }}>YoutцЬе</a>
            <a href="https://www.instagram.com/visualbasic_ernie/ " target="_blank" rel="noopener noreferrer" style={{ marginLeft: 8, fontSize: '0.8em' }}>Іпѕtagгam</a>
            <a href="https://github.com/erniewang " target="_blank" rel="noopener noreferrer" style={{ marginLeft: 8, fontSize: '0.8em' }}>GіtНцЬ</a>
        </h3>
        <p>Hi. I am Ernie. I am a Software Developer and Jazz Musician who loves to build stuffs. Anything honesty, I just love creating anything off the top of my head. I currently reside in Evanston IL, and my hometown is in Plano TX.
            Since my childhood I loved drawing, legos, clay pottery, minecraft world building. Check out my various projects, experience, in the projects section!
        </p>
        <p>
        I also love design and photography, and love traveling and being the most annoying tourist (yes, i am worse than those Chinese and Korean tourists. My photos within a week of travel are about 5 GB). Check out my photos in the photos section and here are some photos of myself!
        </p>
        <ContentObjectHolder height={48} images={imageData} range={[0,4]} width={98} spreadFactor={1.2}></ContentObjectHolder>
        <p>
            Outside of music, software, and design I also love to play video games, many of which are on roblox. Some of the best roblox games I played include Phantom Forces, Apocalypse Rising, Unit 1968, Blood and Iron, and Guts and Blackpowder. Other games I heartily enjoyed through my life include Minecraft , Super Mario, Warzone, Black Ops 2, and Call of Duty Modern Warfare. 
        </p>

        <p>I’m the kind of person who values precision, clarity and impact. Whether I’m writing code, designing something or deep in a game, I want things that work. No fluff, no hand holding. If an idea doesn’t map cleanly to a useful outcome, I’ll scrap it without hesitation. I lean hard into systems that reward both logic and creativity and I push until I understand how things actually function under the surface.</p>
        <ContentObjectHolder height={40} images={imageData} range={[4,7]}></ContentObjectHolder>
        <p>My style is focused and intentional. I like to go straight to the core of a problem, rip out the noise and get to what actually matters. If I’m learning something, I want the 20 percent that gives me 80 percent of the result. If I’m playing, I want tight mechanics and depth, not mindless grind. I don't care for sugarcoating or vague inspiration. Just show me what works and why.</p>

        <p>I also value control. That’s part of why I like coding and software. There’s a kind of power in being able to build from scratch or tweak something until it finally clicks. It’s frustrating sometimes, sure, but the feeling when things work because you made them work? That’s it. That’s the hook. Same thing with design, finding the line between function and feel.</p>
      </div>
    );
}
  