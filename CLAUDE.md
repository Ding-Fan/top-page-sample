# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a collection of Japanese web games and applications showcasing various interactive experiences. The project is primarily a showcase/portfolio site with multiple mini-applications including fortune-telling games (omikuji), calculators, memo apps, and tic-tac-toe games.

## Architecture

### Directory Structure
- **Root**: Main landing page (`index.html`) with navigation to all applications
- **Individual App Directories**: Each application is self-contained in its own directory (e.g., `01_omikuji/`, `02_calculator/`, `04_memo/`)
- **Shared Components**: Reusable UI components in `/components/` directory
- **Shared Assets**: Common resources in `/assets/`, `/css/`, `/js/`, `/img/`

### Component System
The project uses a modular component approach:
- **Universal Button Component** (`components/universal-button.js`): Creates back navigation buttons
- **Footer Component** (`components/footer.js`): Generates copyright footer with current year
- **Background Image Component** (`components/bg-image.js`): Creates full-screen background images
- **Export System** (`components/index.js`): Centralizes component exports

### Application Pattern
Each mini-application follows a consistent pattern:
- Self-contained HTML file as entry point
- Dedicated CSS file for styling
- JavaScript file with game/app logic
- Local assets (images, sounds) in subdirectories
- Many use jQuery and external libraries (animate.css, textillate.js, etc.)

### Code Architecture
- **Module Pattern**: Applications use IIFE (Immediately Invoked Function Expression) pattern for encapsulation
- **State Management**: Each app manages its own state object
- **Controller Pattern**: Separation of UI, Game, and Event handling logic
- **DOM Manipulation**: Heavy use of vanilla JavaScript and jQuery for DOM operations

## Development Notes

### No Build System
This project uses plain HTML, CSS, and JavaScript without any build tools, package managers, or transpilation. All code runs directly in the browser.

### File Serving
Applications are designed to be served directly from the file system or basic web server. No special server configuration required.

### Dependencies
- jQuery (loaded via CDN or local files)
- animate.css for animations
- Various jQuery plugins (textillate.js, lettering.js, snowfall.js)
- No package.json or dependency management system

### Testing
No automated testing framework is present. Testing is done manually by running applications in browser.

### Code Style
- Uses ES6+ features where supported
- Consistent use of semicolons
- Camelcase naming convention
- Extensive commenting in Japanese
- Module pattern for encapsulation

## Development Workflow

Since this is a static site with no build process:
1. Edit files directly
2. Open HTML files in browser to test
3. Refresh browser to see changes
4. Use browser developer tools for debugging

## Common File Patterns

### Game Applications
- Entry point: `[name].html`
- Styling: `css/[name].css`
- Logic: `js/[name].js`
- Assets: `img/`, `sound/`, `assets/`

### Shared Components
- Located in `/components/` directory
- Export functions for reuse
- Focused on UI elements and common functionality
- Loaded via script tags or ES6 imports

## Development Guidelines

### Calculator Implementation Notes
The `03_calcuator(button)/` directory contains a calculator with both mouse and keyboard input support:
- **Event Handling**: Uses event delegation pattern with single listener on main container
- **Keyboard Support**: `keydown` events mapped to calculator functions (numbers, operators, Enter/=, Escape/c)
- **State Management**: Uses global variables (`wkFirst`, `wkTotal`, `wkCalc`, `wkBefore`) to track calculation state
- **Common Issues**: Variable naming typos (e.g., `elementcalcLog` instead of `elementCalcLog`) may cause spell-check warnings

### Code Writing Permission System
This repository uses a permission-based development approach:

#### Permission Commands:
- **"+x"** alone - Grant code writing permission (persistent until revoked)
- **"-x"** alone - Revoke code writing permission (return to explanation-only mode)
- **"+x [request]"** - Grant permission and immediately execute the code request
- **"-x [message]"** - Revoke permission and optionally respond to message

#### Permission Rules:
- **When permission is GRANTED (+x)**: Write code for any implementation requests
- **When permission is REVOKED (-x)**: Discussion mode - actively seek clarification and alignment
- **Default state**: Permission is revoked (-x) - Discussion mode
- **Persistence**: Permission state continues until explicitly changed

#### Discussion Mode Behavior (-x):
When in discussion mode, always:
1. Ask clarifying questions to understand requirements fully
2. Gather context about the project, constraints, and goals
3. Suggest alternatives and best practices during discussion
4. Confirm alignment before suggesting to switch to implementation mode
5. Build comprehensive understanding through progressive questioning
6. Number all questions for efficient responses (1, 2, 3...)
7. Accept indexed responses in format "1 answer 2 answer 3 answer"

#### Response Format:
Always end responses with current permission status:
```
[Response content]

Permission status: +x
```
or
```
[Response content]

Permission status: -x
```