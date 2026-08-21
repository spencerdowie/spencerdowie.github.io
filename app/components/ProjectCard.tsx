import Image from "next/image";
import Bubble from "./Bubble";
import { apiURL } from "../page";

export type Project = {
  name: string;
  title: string;
  releaseYear: string;
  thumbnailPath?: string;
  description: string;
  languages: string[];
  url?: string;
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-gray-900 rounded-md p-4 flex flex-col">
      <div className="mb-3">
        <h3 className="font-bold text-xl mb-2">
          {project.url ? (
            <a href={project.url} className="underline">
              {project.name}
            </a>
          ) : (
            project.name
          )}
        </h3>
        <h4 className="font-semibold text-lg ps-4">{project.title}</h4>
      </div>
      {project.thumbnailPath != undefined ? (
        <Image
          src={apiURL + "images/" + project.thumbnailPath}
          alt={"Thumbnail for " + project.name}
          width={300}
          height={150}
          className="self-center mb-4"
        />
      ) : null}
      <p className="indent-8">{project.description}</p>
      <div className="flex flex-row flex-wrap gap-2 mt-3">
        {project.languages.map((lang) => (
          <Bubble key={lang}>{lang}</Bubble>
        ))}
      </div>
    </div>
  );
}
