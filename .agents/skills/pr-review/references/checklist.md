# Pull Request Review Checklist

A comprehensive checklist for auditing pull request code quality across 8 key engineering pillars.

---

## 1. Business Logic & Functional Correctness

- [ ] **PR Objective**: Does the code accurately and completely satisfy the issue or user story requirements?
- [ ] **Edge Cases**:
  - [ ] Are empty arrays (`[]`), empty strings (`""`), `null`, and `undefined` properly handled?
  - [ ] Are boundary limits tested (e.g., pagination out of bounds, `0`, `-1`, `MAX_INT`)?
  - [ ] Are date/time formats and timezones properly handled (UTC vs Local Time)?
  - [ ] Are conditional branches (`if`/`else`, `switch`) exhaustive?
- [ ] **Race Conditions & Concurrency**:
  - [ ] Is there risk of state or data overwrites when multiple actions run concurrently?
  - [ ] Are realtime searches and filters debounced or throttled?
  - [ ] Is cleanup handled properly (e.g., `AbortController`, event unbinding on unmount)?

---

## 2. Security & Data Protection

- [ ] **Authentication & Authorization**:
  - [ ] Are newly added endpoints or routes protected by middleware and auth guards?
  - [ ] Is role-based and resource-based authorization enforced (preventing Insecure Direct Object References - IDOR)?
- [ ] **Input Validation & Sanitization**:
  - [ ] Are all user inputs (query params, request bodies, route params) validated using strict schemas (e.g., Zod)?
  - [ ] Is raw HTML avoided, or properly sanitized (e.g., DOMPurify) before rendering?
  - [ ] Are database queries parameterized against SQL/NoSQL injections (Prisma ORM queries)?
- [ ] **Secrets & Sensitive Data**:
  - [ ] Are API keys, credentials, and access tokens absent from code and commit history?
  - [ ] Are sensitive environment variables (`SECRET_*`) kept private from client bundles (`NEXT_PUBLIC_*`)?
  - [ ] Is sensitive user data (passwords, tokens, PII) prevented from logging to production consoles?

---

## 3. Performance & Scalability

- [ ] **React & Next.js Rendering**:
  - [ ] Are unnecessary re-renders avoided using `useMemo`, `useCallback`, or `React.memo` where appropriate?
  - [ ] Are inline function definitions avoided in hot loop renders?
  - [ ] Do mapped list items have unique and stable `key` attributes (avoiding array indices for dynamic lists)?
- [ ] **Network & Bundle Size**:
  - [ ] Are heavy components (e.g., charts, rich text editors, modals) dynamically loaded via `next/dynamic` or `React.lazy`?
  - [ ] Are images optimized using `next/image` with explicit dimensions, lazy loading, and modern formats (WebP/AVIF)?
  - [ ] Are library imports tree-shakable (e.g., modular imports instead of entire heavy libraries)?
- [ ] **Database & Query Efficiency**:
  - [ ] Are N+1 query patterns eliminated (using `include`, `select`, or batching in Prisma)?
  - [ ] Are queries selecting only necessary fields rather than full object graphs?
  - [ ] Are proper database indexes in place for frequently queried or filtered columns?

---

## 4. Architecture & React/Next.js Standards

- [ ] **Client vs Server Components**:
  - [ ] Is `'use client'` applied only when client-side interactivity, hooks, or browser APIs are required?
  - [ ] Is data fetching kept on Server Components whenever possible?
- [ ] **Separation of Concerns**:
  - [ ] Are presentational components decoupled from business logic and direct API calls (`@/services`, `@/hooks`, `@/context`)?
  - [ ] Are reusable UI components utilized from `@/components` to avoid duplication?
- [ ] **State Management**:
  - [ ] Is state stored at the appropriate scope (local state vs Context vs Redux/Zustand vs URL query params)?
  - [ ] Is derived state computed on the fly rather than synchronized into redundant state variables?

---

## 5. TypeScript & Type Safety

- [ ] **Strict Typing**: Is the use of `any` eliminated in favor of `unknown`, generics, or well-defined types/interfaces?
- [ ] **Centralized Types**: Are domain types imported from `@/types/*` rather than defined ad-hoc as inline shapes?
- [ ] **Safe Type Narrowing**: Are type guards (`typeof`, `in`, `is`) used instead of unsafe type assertions (`as Type` or `!`)?
- [ ] **Component Props**: Does every component define explicit prop interfaces with clear optionality and defaults?

---

## 6. Error Handling & Resilience

- [ ] **Async Flow Resilience**:
  - [ ] Are asynchronous operations wrapped in `try/catch` or equipped with `.catch()` handlers?
  - [ ] Are user-friendly error notifications (toasts, alerts) displayed when background requests fail?
  - [ ] Are loading states (spinners, skeletons) reset reliably inside `finally` blocks?
- [ ] **Error Boundaries**: Are fallback UI components available to prevent entire page crashes on unexpected errors?

---

## 7. Accessibility & UI/UX

- [ ] **Semantic HTML**: Are proper semantic tags (`<button>`, `<main>`, `<nav>`, `<article>`, `<header>`) used instead of clickable `<div>` elements?
- [ ] **Accessibility (A11y)**:
  - [ ] Do icon-only buttons include descriptive `aria-label` attributes?
  - [ ] Do images have meaningful `alt` text?
  - [ ] Is full keyboard navigation supported (Tab, Enter, Space, Escape)?
  - [ ] Are form inputs associated with `<label>` tags (`htmlFor` / `id`)?
- [ ] **Responsive Design**: Is layout responsiveness verified across Mobile, Tablet, and Desktop breakpoints?

---

## 8. Testing & Maintainability

- [ ] **Test Coverage**:
  - [ ] Are unit or integration tests added for critical logic paths and bug fixes?
  - [ ] Are mocks deterministic and independent of ambient environment state?
- [ ] **Clean Code & Readability**:
  - [ ] Are variable and function names self-documenting and descriptive?
  - [ ] Are dead code, leftover debug logs (`console.log`), and outdated comments removed?
  - [ ] Do functions adhere to the Single Responsibility Principle?
