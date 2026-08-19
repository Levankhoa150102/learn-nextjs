# AGENTS.md

Welcome to the **learn-nextjs** repository. This document defines universal guidelines, architecture conventions, code styles, and workflow rules for all AI coding agents working in this codebase.

---

## 🛠️ Tech Stack & Core Architecture

- **Framework**: Next.js (App Router & Pages Router hybrid, Next 15)
- **Language**: TypeScript (strict type checking enabled)
- **Styling**: Tailwind CSS + Ant Design
- **State Management**: React Context, Redux Toolkit, Zustand
- **Database / ORM**: Prisma ORM
- **Aliases**: `@/*` mapping to root directories (`@/components`, `@/types`, `@/utils`, `@/services`, etc.)

---

## 📋 Universal Engineering Rules

### 1. Git Workflow & Commit Standards
- **Branch Naming**: `<type>/<scope>-<short-description>` (e.g., `feat/calculator-ui`, `fix/login-redirect`).
- **Commit Messages**: Must follow [Conventional Commits](https://www.conventionalcommits.org/):
  - Format: `<type>(<scope>): <imperative summary>`
  - Types: `feat`, `fix`, `refactor`, `perf`, `test`, `style`, `docs`, `chore`.
  - Max 72 chars for the subject line; lowercase; imperative mood (`add`, `fix`, `refactor`).
- **Pre-Push Verification**:
  1. `npx tsc --noEmit` (Zero TypeScript errors).
  2. `npm run lint` (Clean linter output).
  3. Verify diff for zero leftover `console.log`, secrets, or unreferenced assets.
- **Pull Request Protocol**:
  - Keep PR diffs small (< 400 lines).
  - Use structured PR descriptions (Summary, Changes Made, Screenshots/Video, Testing Steps).

👉 *Full reference:* [`.agents/rules/git-workflow.md`](./.agents/rules/git-workflow.md)

---

### 2. React & Next.js Component Best Practices
- **Structure**: One default-export component per file; filename matches component name in `PascalCase.tsx`.
- **Client vs Server**: Add `'use client'` *only* when hooks, browser APIs, or event listeners are required. Keep components on the server by default.
- **Props & Typing**: Always define explicit `type` or `interface` for props. Import domain models from `@/types/*`.
- **Separation of Concerns**: UI components handle presentation and events; business logic and API requests belong in `@/services`, `@/hooks`, or `@/context`.
- **Accessibility**: Use semantic HTML (`<button>`, `<main>`), `aria-label` on icon-only buttons, and explicit `type="button"`.

👉 *Full reference:* [`.agents/rules/components-best-practices.md`](./.agents/rules/components-best-practices.md)

---

### 3. Pull Request Review Skill
When tasked with reviewing pull requests, diffs, or code changes, adhere to the 7-phase review procedure and Conventional Comments standard (`fix:`, `suggestion:`, `question:`, `nit:`, `praise:`).

👉 *Review workflow & checklists:*
- [`.agents/skills/pr-review/SKILL.md`](./.agents/skills/pr-review/SKILL.md)
- [`.agents/skills/pr-review/references/checklist.md`](./.agents/skills/pr-review/references/checklist.md)
- [`.agents/skills/pr-review/references/review-comment-guide.md`](./.agents/skills/pr-review/references/review-comment-guide.md)
- [`.agents/skills/pr-review/references/template-summary.md`](./.agents/skills/pr-review/references/template-summary.md)
