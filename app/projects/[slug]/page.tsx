import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Users,
  Code,
  CheckCircle2,
  Terminal,
  FolderGit2,
  Layers,
  Award,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { siteContent } from "@/data/content";

interface ProjectDetailProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return siteContent.projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({ params }: ProjectDetailProps) {
  const resolvedParams = await params;
  const currentIndex = siteContent.projects.findIndex(
    (p) => p.slug === resolvedParams.slug
  );

  if (currentIndex === -1) {
    notFound();
  }

  const project = siteContent.projects[currentIndex];
  const prevProject =
    currentIndex > 0 ? siteContent.projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < siteContent.projects.length - 1
      ? siteContent.projects[currentIndex + 1]
      : null;

  return (
    <div className="w-full min-h-screen py-24 px-6 bg-zinc-950 text-zinc-100">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* ── Top Bar: Back Button & Category Badge ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2.5 px-4 py-2 bg-zinc-900 border border-zinc-800 font-mono text-xs uppercase tracking-widest text-zinc-300 hover:border-neon hover:text-neon hover:bg-zinc-900/80 transition-all sharp-card"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Arsip Proyek</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-widest px-3 py-1 border border-neon/40 bg-neon/10 text-neon font-bold">
              {project.category}
            </span>
            <span className="font-mono text-xs text-zinc-500 hidden sm:inline">
              SLUG // {project.slug.toUpperCase()}
            </span>
          </div>
        </div>

        {/* ── Project Header ── */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-zinc-800 bg-zinc-900/50 font-mono text-xs text-zinc-400">
            <Terminal className="w-3.5 h-3.5 text-neon" />
            <span>CASE STUDY // SYSTEM ENGINEERING &amp; UI DESIGN</span>
          </div>

          <h1 className="font-mono text-3xl sm:text-4xl md:text-5xl font-black text-zinc-100 tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 font-sans leading-relaxed border-l-2 border-neon pl-4 py-1">
            {project.tagline}
          </p>

          {/* Action links */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-neon text-zinc-950 font-mono text-xs font-bold uppercase tracking-widest hover:bg-neon/80 transition-colors sharp-card shadow-[0_0_20px_rgba(0,255,0,0.2)]"
              >
                <span>Live Website / Demo</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-zinc-700 bg-zinc-900 text-zinc-200 font-mono text-xs font-bold uppercase tracking-widest hover:border-neon hover:text-neon transition-colors sharp-card"
              >
                <span>GitHub Repository</span>
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* ── Architectural Overview ── */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neon">
            <Layers className="w-4 h-4 text-neon" />
            <span>01 // ARCHITECTURAL OVERVIEW &amp; PROBLEM STATEMENT</span>
          </div>
          <div className="p-8 border border-zinc-800 bg-zinc-900/40 space-y-4 text-zinc-300 leading-relaxed sharp-card font-sans text-base sm:text-lg">
            <p>{project.fullDescription}</p>
          </div>
        </div>

        {/* ── Tech Stack ── */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neon">
            <Code className="w-4 h-4 text-neon" />
            <span>02 // TECHNOLOGY STACK &amp; FRAMEWORKS</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {project.techStack.map((tech, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 p-3.5 bg-zinc-900/60 border border-zinc-800 font-mono text-xs text-zinc-200 hover:border-neon transition-colors sharp-card"
              >
                <CheckCircle2 className="w-4 h-4 text-neon shrink-0" />
                <span className="font-bold">{tech}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Team Collaboration & Credits ── */}
        {project.collaborators && project.collaborators.length > 0 && (
          <div className="space-y-6 pt-6 border-t border-zinc-800">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neon">
                <Users className="w-4 h-4 text-neon" />
                <span>03 // TEAM COLLABORATION &amp; CREDITS</span>
              </div>
              <span className="font-mono text-xs text-zinc-500">
                {project.collaborators.length} CONTRIBUTOR(S)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.collaborators.map((collaborator, index) => (
                <div
                  key={index}
                  className="p-5 border border-zinc-800 bg-zinc-900/50 flex flex-col justify-between hover:border-neon/80 transition-all sharp-card group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-neon font-bold">
                        {collaborator.role}
                      </span>
                      {collaborator.degree && (
                        <span className="font-mono text-[10px] px-2 py-0.5 border border-zinc-800 bg-zinc-950 text-zinc-400">
                          {collaborator.degree}
                        </span>
                      )}
                    </div>
                    <h3 className="font-mono text-base font-bold text-zinc-100 group-hover:text-neon transition-colors pt-1">
                      {collaborator.name}
                    </h3>
                  </div>
                  <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                    <span>ROLE / CONTRIBUTION</span>
                    <span className="text-zinc-400 font-semibold">VERIFIED</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Bottom Navigation Between Projects ── */}
        <div className="pt-12 border-t border-zinc-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="flex-1 p-5 border border-zinc-800 bg-zinc-900/40 hover:border-neon hover:bg-zinc-900/80 transition-all sharp-card group text-left"
            >
              <div className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-zinc-400 group-hover:text-neon">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Proyek Sebelumnya</span>
              </div>
              <div className="font-mono text-base font-bold text-zinc-100 group-hover:text-neon mt-1">
                {prevProject.title}
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="flex-1 p-5 border border-zinc-800 bg-zinc-900/40 hover:border-neon hover:bg-zinc-900/80 transition-all sharp-card group text-right"
            >
              <div className="flex items-center justify-end gap-1.5 font-mono text-xs uppercase tracking-widest text-zinc-400 group-hover:text-neon">
                <span>Proyek Selanjutnya</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
              <div className="font-mono text-base font-bold text-zinc-100 group-hover:text-neon mt-1">
                {nextProject.title}
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </div>
    </div>
  );
}
