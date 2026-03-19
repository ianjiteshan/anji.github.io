# ShanOS

An interactive portfolio built like a desktop operating system.

`ShanOS` blends two experiences into one project:

- `OS Mode`: a Windows-XP-inspired portfolio with draggable windows, a terminal, widgets, music, projects, and system-style navigation
- `Recruiter Mode`: a faster, cleaner, scroll-based portfolio view optimized for hiring managers and mobile users

## What It Includes

- React 19 + TypeScript + Vite
- Framer Motion driven transitions and scroll reveals
- Zustand state management for windows, UI, and system state
- Desktop-style window manager
- Recruiter-focused single-page portfolio mode
- Live-ish developer metrics integrations for GitHub, LeetCode, and GeeksForGeeks
- Custom XP-style taskbar, start menu, terminal, and widgets

## Modes

### OS Mode

The main portfolio experience.

It includes:

- draggable windows
- taskbar and start menu
- terminal with portfolio commands
- AI assistant window
- project explorer
- resume viewer
- music player
- image viewer
- desktop widgets

### Recruiter Mode

A more direct portfolio surface for quick evaluation.

It includes:

- hero summary
- recruiter-facing highlights
- project cards
- internship and education timeline
- contact and social links
- dark mode
- scroll-triggered motion

Phones default to recruiter mode. Desktop users can still switch into it manually.

## Getting Started

### Install

```bash
npm install
```

### Run Dev Server

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```text
src/
  core/        stores, hooks, utilities
  data/        projects, skills, timeline data
  features/    app features and windows
    ai/
    apps/
    boot/
    effects/
    metrics/
    os/
    projects/
    recruiter/
    resume/
    terminal/
    timeline/
public/
  images/
  sounds/
  wallpapers/
```

## Main Entry Points

- [src/App.tsx](/Users/jitendrajha/Documents/anji.github.io/src/App.tsx)
- [src/features/os/Desktop.tsx](/Users/jitendrajha/Documents/anji.github.io/src/features/os/Desktop.tsx)
- [src/features/recruiter/RecruiterMode.tsx](/Users/jitendrajha/Documents/anji.github.io/src/features/recruiter/RecruiterMode.tsx)
- [src/features/os/StartMenu.tsx](/Users/jitendrajha/Documents/anji.github.io/src/features/os/StartMenu.tsx)
- [src/features/terminal/Terminal.tsx](/Users/jitendrajha/Documents/anji.github.io/src/features/terminal/Terminal.tsx)

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Zustand
- Howler
- xterm

## Notes

- This repo is designed as a portfolio product, not a generic app shell.
- Recruiter mode and OS mode intentionally serve different audiences.
- Some stats and activity surfaces use external APIs and fall back gracefully when those endpoints fail.

## Author

Anjitesh Shandilya

- GitHub: https://github.com/ianjiteshan
- LinkedIn: https://linkedin.com/in/ianjiteshan
- Email: mailto:anjiteshshandilya@gmail.com
