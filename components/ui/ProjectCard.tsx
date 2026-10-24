"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, Users } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group relative border border-zinc-800 bg-zinc-900/40 p-6 flex flex-col justify-between transition-all duration-300 hover:border-neon hover:bg-zinc-900/80 sharp-card">
      <div>
        {/* Category & Featured Tag */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="font-mono text-xs uppercase tracking-widest text-neon font-semibold">
            {project.category}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 border border-zinc-800 bg-zinc-950 text-zinc-400">
            {project.slug.toUpperCase()}
          </span>
        </div>

        {/* Title */}
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-2 group/title"
        >
          <h3 className="font-mono text-xl font-bold text-zinc-100 group-hover/title:text-neon transition-colors">
            {project.title}
          </h3>
          <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover/title:text-neon group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 transition-transform" />
        </Link>

        {/* Tagline & Description */}
        <p className="mt-2 text-sm text-zinc-300 leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Collaborators credit if available */}
        {project.collaborators && project.collaborators.length > 1 && (
          <div className="mt-4 pt-4 border-t border-zinc-800/80">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 mb-2">
              <Users className="w-3.5 h-3.5 text-neon" />
              <span className="uppercase tracking-wider font-semibold text-zinc-300">
                Team Collaboration
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.collaborators.map((member, i) => (
                <div
                  key={i}
                  className="px-2 py-1 bg-zinc-950 border border-zinc-800 text-[10px] font-mono text-zinc-300"
                >
                  <span className="font-semibold text-zinc-100">
                    {member.name}
                  </span>
                  <span className="text-zinc-500 ml-1">({member.role})</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div>
        {/* Tech Stack */}
        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.techStack.map((tech, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 bg-zinc-950 border border-zinc-800 text-[10px] font-mono text-zinc-400 group-hover:border-zinc-700 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Links */}
        <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between">
          <Link
            href={`/projects/${project.slug}`}
            className="font-mono text-xs uppercase tracking-wider text-neon hover:underline flex items-center gap-1"
          >
            <span>Read Case Study</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-neon transition-colors"
                title="GitHub Repository"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-neon transition-colors"
                title="Live Demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
