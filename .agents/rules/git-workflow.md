# Git Commit & Pull Request Best Practices Rule

Enforces engineering standards for branching, commit hygiene, pre-push verification, and Pull Request (PR) lifecycles.

---

## 1. Branching Strategy & Naming Conventions

Always branch off from the latest `main` branch. Direct commits to `main` are strictly prohibited.

### Branch Naming Scheme
- `feat/<scope>-<description>`: New feature (e.g., `feat/calculator-page`, `feat/auth-login-modal`)
- `fix/<scope>-<description>`: Bug fixes (e.g., `fix/modal-backdrop-close`, `fix/bmi-zero-division`)
- `refactor/<scope>-<description>`: Code refactoring without behavioral change
- `perf/<scope>-<description>`: Performance optimization
- `docs/<scope>-<description>`: Documentation changes
- `chore/<scope>-<description>`: Tooling, dependency updates, and maintenance

---

## 2. Commit Message Standards (Conventional Commits v1.0.0)

All commit messages must be atomic and follow the Conventional Commits specification:

```text
<type>(<scope>): <short description in imperative mood>

[optional body explaining WHAT changed and WHY]

[optional footer: Closes #123, BREAKING CHANGE]
```

### Commit Types
- `feat`: A new user-facing feature
- `fix`: A bug fix
- `refactor`: Code restructuring with no external behavior changes
- `perf`: Code change that improves performance
- `style`: White-space, formatting, semicolons (no logic changes)
- `test`: Adding or updating test cases
- `docs`: Documentation only changes
- `chore`: Build tasks, package updates, config changes

### Commit Guidelines
1. **Imperative Mood**: Use `"add"`, `"fix"`, `"update"`, `"refactor"` (not `"added"`, `"fixing"`, `"updates"`).
2. **Subject Limit**: Keep the first line under 72 characters, lowercase start, no ending punctuation.
3. **Atomicity**: One commit per logical unit of work. Avoid bundling multiple unrelated changes.

---

## 3. Pre-Commit & Pre-Push Verification Checklist

Before pushing commits or opening a PR, always execute:

1. **Type Checking**: `npx tsc --noEmit` must pass with zero errors.
2. **Linting**: `npm run lint` must pass cleanly.
3. **Clean Diff Inspection**:
   - No leftover debug `console.log` or `debugger` statements.
   - No committed secrets, API keys, credentials, or `.env` files.
   - No orphan/unused assets committed into `public/`.
   - No unintentional whitespace or unrelated file churn.
4. **Rebase against Base**: Ensure branch is up to date with `origin/main` via `git rebase origin/main`.

---

## 4. Pull Request Standards

### PR Title
Must adhere to Conventional Commits:
`feat(calculator): add interactive BMI calculator UI at /calculator`

### PR Scope & Size
- Keep PRs concise and focused: target **< 400 lines of diff**.
- Split large epics into stacked, incremental PRs.

### PR Description Structure
Every PR must include:
- **Summary**: Concise overview of what this PR does and why.
- **Changes Made**: Bulleted list of technical changes.
- **Screenshots / Recordings**: Visual proof for any UI modifications.
- **Related Issue**: `Closes #<issue_id>` or `Fixes #<issue_id>`.
- **How to Test / Verification**: Step-by-step reproduction instructions.

---

## 5. Review & Merge Protocol

1. **Self-Review**: Review your own diff on GitHub before requesting peer review.
2. **Draft State**: Keep PR as Draft until all checks pass and it is ready for review.
3. **Addressing Review Comments**: Push focused follow-up commits and reply to all reviewer threads.
4. **Clean Merge**: Use Squash & Merge with clean summary; delete the feature branch after merge.
