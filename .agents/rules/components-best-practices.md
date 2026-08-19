# Components Best Practices

Follow these standard patterns when creating or modifying UI components in `components/`.

---

## 1. Structure & Organization

- **One Default Export Per File**: Filename matches the component name in `PascalCase.tsx` (e.g., `UserModal.tsx`).
- **Feature Grouping**: Group components by feature or domain: `Layout/`, `calculator/`, `socket/`, `auth/`.
- **Shared UI**: Place shared generic components at `components/` root; place feature-specific UI in designated subfolders.

---

## 2. Client vs Server Directives

Apply `'use client'` only when the component strictly requires client-side behavior (React hooks, browser DOM APIs, event handlers, or interactive widgets). Keep components on the server by default.

```tsx
// ✅ Needs 'use client'
'use client';
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

// ✅ Server / Presentational Component (No directive needed)
export default function UserCard({ user }: UserCardProps) {
  return <div className="p-4">{user.name}</div>;
}
```

---

## 3. Props & Type Safety

- **Explicit Interfaces**: Define explicit `interface` or `type` for component props (e.g., `ConfirmModalProps`).
- **Consistent Callback Naming**: Use standard callback names `onConfirm`, `onCancel`, `onClose`, `onChange`.
- **Centralized Domain Types**: Import business domain models from `@/types/*` rather than declaring ad-hoc inline types.

---

## 4. Import Conventions

- **Path Aliases**: Always use `@/` alias instead of brittle deep relative imports (`../../`).
- **Ant Design & Tailwind**: Use Tailwind utility classes for layout, spacing, and colors; use Ant Design for complex widgets (Form, Modal, Spin) where appropriate.

```tsx
// ✅ GOOD
import ConfirmModal from '@/components/ConfirmModal';
import { User } from '@/types/userType';

// ❌ AVOID
import ConfirmModal from '../../ConfirmModal';
```

---

## 5. Separation of Concerns

- **Pure Presentation**: Components should focus solely on rendering UI and dispatching user events.
- **Business Logic Extraction**: Move API requests, auth state logic, and heavy calculations into `@/services`, `@/hooks`, or `@/context`.
- **Derived State**: Compute values on the fly (`useMemo` or simple variables) instead of duplicating into extra `useState`.

---

## 6. Accessibility (A11y)

- Use semantic HTML (`<button>`, `<main>`, `<header>`, `<nav>`).
- Provide `aria-label` for icon-only buttons.
- Specify `type="button"` on non-submit buttons to avoid unintended form triggers.
