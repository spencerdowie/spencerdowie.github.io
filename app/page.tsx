"use client";
import { Masonry } from "@mui/lab";
import { LinkedIn, GitHub, Mail } from "@mui/icons-material";
import Image from "next/image";
import { PropsWithChildren, useEffect, useState } from "react";
import ProjectCard, { Project } from "./components/ProjectCard";
import Bubble from "./components/Bubble";

export const apiURL = "https://fullstack-8ksk.onrender.com/";

export default function Home() {
  const [projects, SetProjects] = useState<Project[]>([]);
  const [languages, SetLanguages] = useState<string[]>([]);
  const [filter, SetFilter] = useState<string>("");

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
    <div className="flex flex-col flex-1 items-center justify-center font-sans bg-mist-950 h-full">
      <main className="flex flex-1 w-full max-w-7xl flex-col items-center justify-between pt-16 px-16 gap-16 sm:items-start h-full">
        {/*Title*/}
        <div className="flex flex-row items-baseline gap-5">
          <h1 className="text-4xl/7 font-bold text-white">Spencer Dowie</h1>
          <h2 className="text-2xl/7 font-bold text-white">
            Full-Stack Web Developer
          </h2>
        </div>
        <div className="flex flex-row items-start min-h-0 flex-wrap gap-16">
          {/*Left Column*/}
          <div className="flex flex-col flex-1 max-w-100 lg:h-full md:shrink">
            <h2 className="text-2xl font-bold">About Me</h2>
            <p>
              A web developer with a background in game programming. I have 2+
              years of experience in web development and over 8 years of
              experience in game programming as part of an indie game studio
              that I co-founded.
            </p>
            <div className="flex gap-6 lg:mt-auto mb-10">
              <a
                className="text-lg font-semibold"
                href="https://www.linkedin.com/in/spencer-dowie/">
                <LinkedIn />
                LinkedIn
              </a>
              <a
                className="text-lg font-semibold"
                href="https://github.com/spencerdowie">
                <GitHub />
                GitHub
              </a>
              <a
                className="text-lg font-semibold"
                href="mailto:spencer.dowie@hotmail.com">
                <Mail />
                Email
              </a>
            </div>
          </div>
          {/*Right Column*/}
          <div className="flex flex-col flex-2 h-full">
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
            <div className="overflow-y-auto">
              <Masonry columns={{ xs: 1, sm: 2 }} spacing={3}>
                {projects
                  .filter(
                    (project) =>
                      filter == "" || project.languages.includes(filter)
                  )
                  .map((project) => (
                    <ProjectCard key={project.name} project={project} />
                  ))}
              </Masonry>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
