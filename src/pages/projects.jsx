import { DescriptionObjectHolder } from "../componets/contentObject";
export default function Projects() {
    return (
      <div>
        <h2>Projects</h2>
        <p>Here are some of the coolest programming projects I have built recently!</p>
        <h3>Harmonizer</h3>
        <DescriptionObjectHolder height={20}></DescriptionObjectHolder>
        <h3>Resume Tuner</h3>
        <DescriptionObjectHolder height={15}></DescriptionObjectHolder>
        <h3>Dance2Music</h3>
        <DescriptionObjectHolder height={17}></DescriptionObjectHolder>
      </div>
    );
  }
  