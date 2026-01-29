# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"The Crypto Drop" - A cryptocurrency app review platform built as a single-file React application with a brutalist UI design aesthetic.

## Technology Stack

- **Framework:** React 18+ with React Router v6
- **Styling:** Tailwind CSS (utility classes) + custom CSS injected at runtime
- **Fonts:** Anton (display/headings), Inter (body text)
- **State:** React useState hooks (no external state management)

## Architecture

The entire application lives in `react-app.js` (342 lines). Components are defined in this order:

1. `customStyles` - Shared inline style objects
2. `ReviewCard` - Displays individual crypto app reviews with ratings
3. `LovedAppItem` - Sidebar list item for favorite apps
4. `Header` - Navigation bar with mobile menu toggle
5. `Footer` - Multi-column footer
6. `HomePage` - Main page composing all sections (featured review, review grid, sidebar)
7. `App` - Root component with Router and dynamic stylesheet injection

Key patterns:
- Dynamic CSS injection via `useEffect` in App component (lines 296-330)
- All review/app data is hardcoded in `HomePage` component
- Custom brutalist CSS classes: `.brutalist-shadow`, `.brutalist-shadow-hover`, `.brutalist-shadow-sm`

## Design System

**Colors:**
- Primary accent: `#D1FAE5` (mint green)
- Text/borders: Black (`#000`)
- Background: `#D1FAE5`

**Brutalist styling rules:**
- 2-4px black borders on all containers
- Box shadows with pixel offsets (4px, 6px, 8px)
- Sharp corners (no border-radius except specific badges)
- Uppercase text with wide letter-spacing for headings

## Build & Development

This is a component file meant to be imported into a React build system. No package.json or build configuration exists in this repo.

To use this file, you need:
- A React project with `react`, `react-dom`, `react-router-dom` installed
- Tailwind CSS configured
- An entry point that renders the `App` component

## File Structure

```
react-app.js          # Complete application (all components)
.claude/              # Claude Code settings
```
