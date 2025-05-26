# Development Guidelines for mehrnettovombrutto

This document provides specific information for developers working on this project.

## Build and Configuration Instructions

### Prerequisites
- Node.js (version 18 or higher recommended)
- pnpm (the project uses pnpm as package manager)

### Setup
1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

### Development
To start the development server with Turbopack:
```bash
pnpm dev
```

The application will be available at http://localhost:3000.

### Building for Production
To create a production build:
```bash
pnpm build
```

To start the production server:
```bash
pnpm start
```

## Testing

The project uses Jest for testing.

### Running Tests
To run all tests:
```bash
pnpm test
```

### Adding New Tests
1. Create test files with the naming convention `*.test.ts` or `*.test.tsx`
2. Place test files either:
   - In the `__tests__` directory at the project root
   - Next to the file they are testing with the `.test.ts` extension

### Example Test
Here's a simple example test for the `berechneStundenlohn` utility function:

```typescript
import { berechneStundenlohn } from '../src/utils/stundenlohn';

describe('berechneStundenlohn', () => {
  it('calculates hourly wage correctly', () => {
    // Test case 1: 160 hours per month, 3200€ salary
    expect(berechneStundenlohn(160, 3200)).toBe(20);
    
    // Test case 2: 40 hours per week (173.33 hours per month), 4000€ salary
    expect(berechneStundenlohn(173.33, 4000)).toBe(23.08);
    
    // Test case 3: Part-time 80 hours per month, 1600€ salary
    expect(berechneStundenlohn(80, 1600)).toBe(20);
  });
});
```

## Code Style and Development Practices

### Code Formatting
- The project uses Prettier for code formatting with default settings
- ESLint is configured with Next.js's recommended rules

### Project Structure
- `/src/app`: Next.js App Router components and pages
- `/src/contexts`: React context providers
- `/src/types`: TypeScript type definitions
- `/src/utils`: Utility functions, including:
  - `/utils/sozialabgaben`: Social security contribution calculations
  - `/utils/steuern`: Tax calculations

### Path Aliases
The project uses TypeScript path aliases:
- `@/*` maps to `./src/*`

### Component Organization
- Follow the Next.js App Router conventions
- Place page components in the appropriate directory under `/src/app`
- Shared components should be placed in `/src/app/components`

### State Management
- Use React context for global state (see `/src/contexts`)
- Use React hooks for component-level state
