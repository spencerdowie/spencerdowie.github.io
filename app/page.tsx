"use client";
import { Masonry } from "@mui/lab";
import Image from "next/image";
import { PropsWithChildren, useEffect, useState } from "react";

const apiURL = "https://fullstack-8ksk.onrender.com/";

type Project = {
  name: string;
  title: string;
  releaseYear: string;
  thumbnailPath?: string;
  description: string;
  languages: string[];
};

interface BubbleProps extends PropsWithChildren {
  selected?: boolean;
  onClick?: () => void;
}

function Bubble({ children, selected, onClick }: BubbleProps) {
  const colour = selected ? "bg-blue-900 border-2" : "bg-blue-950";
  return (
    <div
      className={"py-1 px-3 rounded-4xl shrink hover:bg-blue-800 " + colour}
      onClick={onClick}>
      {children}
    </div>
  );
}

export default function Home() {
  const [projects, SetProjects] = useState<Project[]>([]);
  const [languages, SetLanguages] = useState<string[]>([]);
  const [filter, SetFilter] = useState<string>("");

  function GetProjects() {
    return projects
      .filter((project) => filter == "" || project.languages.includes(filter))
      .map((project) => (
        <div key={project.name} className="bg-gray-900 rounded-md p-4 flex flex-col">
          <div className="mb-3">
            <h3 className="font-bold text-xl mb-2">{project.name}</h3>
            <h4 className="font-semibold text-lg ps-4">{project.title}</h4>
          </div>
          {project.thumbnailPath != undefined ? (
            <Image
              src={apiURL + "images/" + project.thumbnailPath}
              alt={"Thumbnail for " + project.name}
              width={300}
              height={150}
              className="self-center"
            />
          ) : null}
          <p>{project.description}</p>
          <div className="flex flex-row flex-wrap gap-2 mt-3">
            {project.languages.map((lang) => (
              <Bubble key={lang}>{lang}</Bubble>
            ))}
          </div>
        </div>
      ));
  }

  async function FetchPortfolioData(): Promise<Project[]> {
    const langs: string[] = [];
    const projs: Project[] = [];
    await fetch(apiURL + "api/web")
      .then((res) => res.json())
      .then((projRes: Project[]) => {
        projRes.forEach((project) => projs.push(project));
      });

    await fetch(apiURL + "api/games")
      .then((res) => res.json())
      .then((projRes: Project[]) => {
        projRes.forEach((project) => (project.languages = ["Unity", "C#"]));
        projRes.forEach((project) => projs.push(project));
      });

    return projs;
  }

  useEffect(() => {
    const langs: string[] = [];
    FetchPortfolioData().then((projs) => {
      projs.forEach((project) =>
        project.languages.forEach((lang) => {
          if (!langs.includes(lang)) langs.push(lang);
        })
      );
      SetLanguages(langs);
      SetProjects(projs);
    });
  }, []);

  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans bg-mist-950">
      <main className="flex flex-1 w-full max-w-7xl flex-col items-center justify-between py-16 px-16  sm:items-start">
        <div className="flex flex-row items-baseline gap-5 mb-16">
          <h1 className="text-4xl/7 font-bold text-white">Spencer Dowie</h1>
          <h2 className="text-2xl/7 font-bold text-white">
            Full-Stack Web Developer
          </h2>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col flex-1">
            <h2 className="text-2xl font-bold">About Me</h2>
            <p>
              A web developer with a background in game programming. I have 2+
              years of experience in web development and over 8 years of
              experience in game programming as part of an indie game studio
              that I co-founded.
            </p>
          </div>
          <div className="flex flex-col flex-2">
            <h2 className="text-2xl font-bold mb-3">Projects</h2>
            <div className="flex flex-row mx-2 mb-3 gap-2">
              {languages.map((language) => {
                const isFilter = filter === language;
                return (
                  <Bubble
                    key={language}
                    selected={isFilter}
                    onClick={() =>
                      isFilter ? SetFilter("") : SetFilter(language)
                    }>
                    {language}
                  </Bubble>
                );
              })}
            </div>
            <Masonry columns={2} spacing={3}>
              {GetProjects()}
            </Masonry>
          </div>
        </div>
      </main>
    </div>
  );
}
