# AGENTS.md

## Project Overview

Rail Boss - A train/railway simulation game built with Astro and TypeScript.

Refer to DESIGN.md for game rules and controls.

## Available Agents

### UI Component Agent

**Purpose**: Handle Astro component development and modifications **Tools**:
Read, Write, Edit, Glob **Files**: `src/components/*.astro` **Capabilities**:

- Create new components
- Modify existing components
- Fix styling issues
- Add interactivity
- Update component structure

### Game Logic Agent

**Purpose**: Work with TypeScript game logic and state management **Tools**:
Read, Write, Edit, Task **Files**: `src/lib/*.ts` **Capabilities**:

- Implement game state management
- Add new game mechanics
- Fix bugs in game logic
- Optimize performance
- Add new features

### Testing Agent

**Purpose**: Handle test creation and maintenance **Tools**: Read, Write, Edit,
Bash **Files**: `src/**/*.test.ts` **Capabilities**:

- Create new tests
- Fix failing tests
- Add test coverage
- Run test suites
- Debug test issues

### Build & Deploy Agent

**Purpose**: Handle project building and deployment **Tools**: Bash, Read
**Files**: `package.json`, `astro.config.*` **Capabilities**:

- Run development server
- Build production version
- Optimize build output
- Handle deployment
- Manage dependencies

## Development Commands

```bash
# Development server
deno run dev

# Build for production
deno run build

# Preview production build
deno run preview

# Run tests (if any)
deno test  # Note: This project may not have a test script yet
```

## Project Structure

```
src/
├── components/     # Astro components (UI)
│   ├── Track.astro
│   ├── Train.astro
│   ├── ControlPanel.astro
│   ├── Map.astro
│   ├── Station.astro
│   ├── StartupModal.astro
│   └── Stat.astro
├── layouts/        # Layout components
│   └── Layout.astro
└── lib/           # TypeScript game logic
    ├── Station.ts
    ├── StationSize.ts
    └── GameState.ts
```

More files to be added in these folder as project expands.

## Agent Usage Examples

### Creating a New Component

1. Use **UI Component Agent** to create a new component
2. Follow existing component patterns
3. Import necessary dependencies
4. Add to ControlPanel.astro if needed
5. Add a test file for the new component using vitest for validation

### Adding New Game Features

1. Use **Game Logic Agent** to modify `GameState.ts`
2. Update components to use new features
3. Add tests for new functionality
4. Test in development environment

### Fixing Issues

1. Identify the agent based on file type
2. Use appropriate tools to diagnose
3. Implement fixes
4. Test changes
