# Contributing to Nutrition App

Thank you for your interest in contributing to the Nutrition App! This document provides guidelines and instructions for contributing.

## Getting Started

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/test-copilot.git
   cd test-copilot
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Running the App

```bash
# Start the development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on Web
npm run web
```

### Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Linting

```bash
# Lint code
npm run lint

# Format code
npm run format
```

## Code Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` types when possible
- Export types that may be used by other modules

### React Components

- Use functional components with hooks
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks
- Use meaningful component and prop names

### File Organization

```
src/
├── components/      # Reusable UI components
├── screens/         # Screen components
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
├── constants/       # Constants and configuration
└── navigation/      # Navigation configuration (future)
```

### Naming Conventions

- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Utilities**: camelCase (e.g., `validation.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_AGE`)
- **Types**: PascalCase (e.g., `UserProfile`)

## Making Changes

### Adding New Features

1. **Check existing issues** to avoid duplicates
2. **Create an issue** describing the feature
3. **Wait for approval** before starting work
4. **Write tests** for new functionality
5. **Update documentation** as needed

### Fixing Bugs

1. **Create an issue** describing the bug
2. **Include steps to reproduce**
3. **Fix the bug** in a focused commit
4. **Add tests** to prevent regression
5. **Reference the issue** in your PR

### Adding Validation Rules

To add new validation rules:

1. Update types in `src/types/UserProfile.ts`
2. Add validation logic in `src/utils/validation.ts`
3. Write tests in `__tests__/utils/validation.test.ts`
4. Update documentation if needed

### Adding Onboarding Steps

To add a new step to the onboarding flow:

1. Create component in `src/screens/onboarding/`
2. Add to `OnboardingContainer.tsx`
3. Update `ONBOARDING_STEPS` in `src/constants/options.ts`
4. Add to progress indicator

## Security Guidelines

### Health Data

- **Never log** health data to console
- **Always encrypt** sensitive information
- **Use SecureStore** for persistent storage
- **Validate all inputs** before storage

### Code Review Checklist

- [ ] No sensitive data in logs
- [ ] Input validation implemented
- [ ] Error handling in place
- [ ] Tests written and passing
- [ ] Documentation updated
- [ ] No console.log statements
- [ ] TypeScript types defined

## Pull Request Process

1. **Update your branch**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run tests and linting**
   ```bash
   npm test
   npm run lint
   ```

3. **Commit your changes**
   ```bash
   git commit -m "Brief description of changes"
   ```

4. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request**
   - Use a clear title
   - Describe what changed and why
   - Reference related issues
   - Include screenshots for UI changes

### PR Title Format

```
[Type] Brief description

Types:
- Feature: New functionality
- Fix: Bug fix
- Docs: Documentation changes
- Style: Code style changes
- Refactor: Code refactoring
- Test: Adding or updating tests
- Chore: Maintenance tasks
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe how you tested the changes

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] Code follows style guidelines
- [ ] No console errors
- [ ] Self-review completed
```

## Code Review

### As a Reviewer

- Be respectful and constructive
- Ask questions for clarification
- Suggest improvements, don't demand
- Approve when ready

### As an Author

- Respond to all comments
- Make requested changes
- Ask for clarification if needed
- Be open to feedback

## Questions?

If you have questions:
- Check the [README](README.md)
- Check the [Architecture](ARCHITECTURE.md)
- Open an issue for discussion
- Reach out to maintainers

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.
