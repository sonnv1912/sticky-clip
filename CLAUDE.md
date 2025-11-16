# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Sticky Clip is a cross-platform clipboard manager built with Electron, React, and TypeScript. It provides a sticky-style interface for managing clipboard history with keyboard shortcuts, themes, and advanced search capabilities.

## Development Commands

```bash
npm run dev          # Start development server with hot-reload
npm run build        # Create distributable packages for all platforms
npm run prebuild     # Clean build directory (runs automatically before build)
```

## Architecture

### Core Technologies
- **Electron 35.2.0** - Cross-platform desktop framework
- **React 19** with TypeScript - UI layer with modern hooks
- **Vite 6.3.2** - Build tool and development server
- **Electron Forge** - Packaging and distribution
- **Biome 1.9.4** - Linting and formatting (3-space indentation, 80-char line width)

### Project Structure
```
src/
├── main.ts                 # Electron main process entry point
├── preload.ts              # IPC bridge between main and renderer
├── renderer.ts            # React renderer entry point
├── app.tsx                # React root component
├── components/
│   ├── layout/            # Layout components (header, modal)
│   ├── screen/home/       # Main screen components
│   └── ui/                # Reusable UI primitives
├── stores/                # Zustand state management
│   ├── app-store.ts       # App-wide state (theme, settings)
│   └── search-store.ts    # Search functionality
├── server/                # IPC event handlers
│   ├── app-event.ts       # App-related IPC events
│   └── clipboard-event.ts # Clipboard monitoring and management
├── types/                 # TypeScript definitions
├── configs/constants.ts   # App constants, themes, events
├── schemas/               # Form validation with Zod
├── modals/                # Modal components
├── hooks/                 # Custom React hooks
└── assets/                # Static assets (fonts, styles, icons)
```

### Key Patterns

**State Management**: Uses Zustand with persistence for app settings and search state. Stores follow kebab-case naming (`app-store.ts`).

**IPC Communication**: Structured event system with context bridge for security. All IPC handlers are in `src/server/` with clear separation between app and clipboard events.

**Clipboard Management**:
- Monitors clipboard every 1000ms for changes
- Supports both text and image content
- Uses UUID for item identification and `uniqBy` for deduplication
- Implements marked/favorite items functionality

**Component Organization**:
- `layout/` - Page structure components
- `screen/` - Page-specific components
- `ui/` - Reusable primitive components
- PascalCase naming for all components

**Import Aliases**:
```typescript
"@/*": ["./src/*"]
"@components/*": ["./src/components/*"]
"@stores/*": ["./src/stores/*"]
"#types/*": ["./src/types/*"]
```

### Development Features

**Theming**: CSS variables with dark/light themes and custom Writer font family.

**Keyboard Navigation**: Integrated hotkeys using `react-hotkeys-hook` with configurable global shortcuts.

**Form Handling**: React Hook Form with Zod validation schemas for all user inputs.

**Error Handling**: Toast notifications via react-toastify for user feedback.

## Build Configuration

- **Main Config**: `vite.main.config.ts`
- **Renderer Config**: `vite.renderer.config.mjs`
- **Electron Config**: `forge.config.ts`
- **TypeScript Config**: `tsconfig.json`
- **Tailwind Config**: `tailwind.config.ts`

## Code Quality

- Uses Biome instead of ESLint/Prettier
- 3-space indentation with 80-character line width
- Automatic import sorting enabled
- No default exports convention for better tree-shaking
- Comprehensive TypeScript coverage