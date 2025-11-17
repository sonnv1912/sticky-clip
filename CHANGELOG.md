# Changelog

All notable changes to Sticky Clip will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

### Fixed

## [2.4.1] - 2025-11-17

### Fixed
- **Clipboard item height** - Added max-height limit to prevent excessive expansion and maintain consistent UI layout

## [2.4.0] - 2025-11-17

### Added
- **Global search shortcuts** - Integrated react-hotkeys-hook for global `/` key search activation across the entire application
- **Swipe navigation system** - Implemented comprehensive swipe event handling with touch and trackpad support for browsing clipboard history
- **Dynamic toast theming** - Enhanced toast notification system with automatic color adaptation based on current theme
- **Advanced keyboard navigation** - Complete keyboard accessibility including arrow key navigation, item selection, and action shortcuts

### Technical Improvements
- **Enhanced IPC communication** - Improved main-renderer process communication for better gesture handling
- **Optimized event handling** - Streamlined event listeners for swipe gestures with proper cleanup
- **Improved window management** - Better window sizing and positioning logic

### Fixed
- **Window sizing** - Corrected default height calculations for proper initial window display
- **State persistence** - Fixed marked items state preservation during clipboard operations
- **UI stability** - Eliminated settings modal flickering with improved rendering logic

## [2.3.0] - 2025-09-27

### Added
- **Comprehensive keyboard navigation** - Full integration of react-hotkeys-hook for system-wide keyboard shortcuts
- **Enhanced item selection** - Improved clipboard item selection with visual feedback and keyboard support
- **Accessibility improvements** - Better screen reader support and keyboard-first user experience

### Technical Enhancements
- **Event system overhaul** - Completely redesigned event handling for more responsive keyboard interactions
- **Component optimization** - Streamlined clipboard item components for better performance
- **Search integration** - Seamless search functionality with keyboard navigation

## [2.2.4] - 2025-04-29

### Added
- **Advanced theme management system** - Complete overhaul of theme handling with dynamic color customization
- **Custom color picker** - Interactive color input component with real-time preview and validation
- **Click-outside detection** - Custom hook for detecting clicks outside modal components
- **Dynamic theme modal** - Fully featured theme customization interface with live preview
- **Dynamic style loading** - Runtime CSS loading for theme changes without app restart
- **Optimized theme variables** - Streamlined CSS custom properties for better performance
- **Enhanced InputKeyboard component** - Improved keyboard input handling with better accessibility

### Fixed
- **Dark theme color consistency** - Fixed fade colors and removed duplicate styles in light theme CSS
- **Modal rendering issues** - Resolved settings modal blinking with improved component lifecycle management
- **Theme switching performance** - Optimized theme variable updates for smoother transitions

### Changed
- **Theme architecture refactoring** - Complete restructure of theme color system for better maintainability
- **Variable organization** - Improved CSS custom properties organization and naming conventions

### Technical Details
- **Modal component improvements** - Enhanced modal functionality with better state management
- **Theme persistence** - Improved theme saving and loading mechanisms
- **Component decoupling** - Better separation of concerns in theme-related components

## [2.2.3] - 2025-04-27

### Fixed
- **Version synchronization** - Corrected version number in package.json to match release notes

## [2.2.2] - 2025-04-24

### Added
- **Auto-update mechanism** - Integrated update-electron-app dependency for automatic app updates
- **Repository metadata** - Updated package.json repository field for better package management

### Fixed
- **Window sizing for development** - Corrected window width calculations for non-packaged development builds

## [2.2.1] - 2025-04-24

### Fixed
- **App identity** - Restored correct app name to 'Sticky Clip' and updated version information

## [2.1.0] - 2025-04-22

### Added
- **Initial feature set** - Core clipboard management functionality
- **Basic UI components** - Essential interface elements for clipboard interaction
- **Theme support** - Light and dark theme implementation
- **Search functionality** - Basic clipboard search with debounced input
- **Toast notifications** - User feedback system for actions and errors

### Fixed
- **Window dimensions** - Adjusted window height to match display requirements
- **Global shortcuts** - Configured keyboard shortcuts from settings panel
- **Script consistency** - Standardized script names in package.json for better development workflow

## Dependency Updates (Historical)

### Major Framework Updates
- **TypeScript**: 4.5.5 → 5.8.3 (Major version upgrade with enhanced type safety)
- **Electron**: 35.0.2 → 35.2.0 (Security and performance improvements)
- **React**: Upgraded to React 19 (Latest features and optimizations)
- **Vite**: 5.4.18 → 6.3.2 (Build tool improvements and faster development)

### UI and Form Libraries
- **Motion**: 12.7.3 → 12.7.4 (Animation library enhancements)
- **React Hook Form**: 7.55.0 → 7.56.0 (Form handling improvements)
- **@hookform/resolvers**: 4.1.3 → 5.0.1 (Validation resolver updates)
- **Zod**: 3.24.2 → 3.24.3 (Schema validation enhancements)

### Development Tools
- **Biome**: 1.9.4 (Code formatting and linting)
- **TypeScript Node**: ts-node 10.9.2 (Development TypeScript execution)

### Project Configuration
- **Dependabot automation**: Set up automatic dependency monitoring and updates
- **CODEOWNERS**: Added ownership file for code review management
- **GitHub workflows**: Configured CI/CD and automated PR processes
- **Build optimization**: Enhanced Electron Forge configuration for better packaging

---

## Architecture Overview

### Core Technologies
- **Electron 35.2.0** - Cross-platform desktop application framework
- **React 19** with TypeScript - Modern UI component library with latest features
- **Vite 6.3.2** - Fast build tool and development server with hot-reload
- **Zustand 5.0.3** - Lightweight state management with persistence
- **React Hook Form 7.56.0** with Zod 3.24.3 - Form handling with schema validation
- **Biome 1.9.4** - Code formatting and linting (3-space indentation, 80-char line width)
- **Tailwind CSS 4.0.15** - Utility-first CSS framework with custom themes

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
├── server/                # IPC event handlers
├── types/                 # TypeScript definitions
├── configs/constants.ts   # App constants, themes, events
├── schemas/               # Form validation with Zod
├── modals/                # Modal components
├── hooks/                 # Custom React hooks
└── assets/                # Static assets (fonts, styles, icons)
```

## Key Features

### Clipboard Management
- **Real-time monitoring** - Automatic clipboard content detection every 1000ms
- **Multi-format support** - Text and image content handling
- **Deduplication** - Smart duplicate detection using UUID and content comparison
- **Marked items** - Favorite/pin important clipboard items for quick access
- **Search functionality** - Fast, debounced search across clipboard history

### User Interface
- **Keyboard shortcuts** - Global shortcuts including Ctrl+K and `/` for instant search access
- **Swipe gestures** - Touch and trackpad navigation support
- **Theme system** - Dynamic light/dark themes with custom color picker
- **Toast notifications** - Contextual feedback for user actions
- **Responsive design** - Adaptive layout for different screen sizes

### Accessibility
- **Keyboard navigation** - Complete keyboard control with arrow keys and shortcuts
- **Screen reader support** - ARIA labels and semantic HTML
- **High contrast themes** - Customizable color schemes for visibility

## Development Workflow

### Build System
- **Development**: `npm run dev` - Hot-reload development server
- **Production**: `npm run build` - Cross-platform packaging with Electron Forge
- **Pre-build**: Automatic cleanup and optimization
- **Type checking**: Comprehensive TypeScript validation

### Code Quality
- **Biome formatting** - Consistent code style with 3-space indentation
- **Import sorting** - Automatic import organization
- **Type safety** - Full TypeScript coverage with strict mode
- **Component patterns** - Consistent naming and structure conventions

### Testing & Deployment
- **Automated testing** - Unit and integration test coverage
- **Cross-platform builds** - Windows, macOS, and Linux packaging
- **Auto-updates** - Integrated update mechanism for seamless upgrades
- **Continuous integration** - GitHub Actions for automated workflows

## Technical Specifications

### Performance Optimizations
- **Virtual scrolling** - Efficient rendering for large clipboard histories
- **Debounced search** - Optimized search with 300ms delay
- **Lazy loading** - On-demand component and resource loading
- **Memory management** - Efficient clipboard content cleanup

### Security Features
- **IPC sandboxing** - Secure communication between processes
- **Content validation** - Sanitization of clipboard content
- **Permission management** - Controlled access to system resources
- **Update verification** - Cryptographic signature verification for updates

## Future Roadmap

### Planned Features
- **Cloud sync** - Synchronize clipboard across devices
- **Plugins system** - Extensible architecture for custom functionality
- **Advanced search** - Regex search and filtering options
- **Export functionality** - Save clipboard history to files
- **Team sharing** - Collaborative clipboard features

### Technical Improvements
- **Performance monitoring** - Built-in analytics and optimization tools
- **Plugin API** - Developer-friendly extension system
- **Database optimization** - Faster clipboard content indexing
- **UI animations** - Smooth transitions and micro-interactions