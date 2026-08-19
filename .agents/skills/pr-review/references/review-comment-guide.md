# Review Comment Guide (Conventional Comments)

Effective PR reviews require a balance of **rigorous engineering standards** and **empathetic, constructive communication**.

---

## 1. Conventional Comments Standards

Using standardized label prefixes allows the PR author to immediately understand the intent, severity, and urgency of each review comment:

| Label | Severity | Purpose & When to Use |
| :--- | :--- | :--- |
| **`fix:`** / **`blocker:`** | Mandatory (Must fix) | Critical bug, security vulnerability, runtime crash, broken requirement, or architectural regression. Must be resolved before merge. |
| **`suggestion:`** | Recommended (Should fix) | Concrete proposal to improve performance, readability, type safety, or maintainability without fixing a direct bug. |
| **`question:`** | Clarification | Inquiring about design rationale, business domain context, or unfamiliar code patterns. |
| **`nit:`** | Minor (Nice to have) | Small stylistic tweak, typo, or naming improvement. Does not block merge if author chooses not to address immediately. |
| **`thought:`** | Discussion | High-level idea or architectural consideration for future iterations; requires no immediate code change in this PR. |
| **`chore:`** | Housekeeping | Minor auxiliary tasks like updating documentation, dependencies, or tracking TODO tickets. |
| **`praise:`** | Positive Feedback | Recognizing clever solutions, clean refactors, excellent edge-case handling, or thorough test coverage. |

---

## 2. The 3-Part Comment Anatomy

Every actionable review comment should follow this 3-part structure:

```text
[Label] [Decorators (optional)]: [What is the issue / observation?]

[Why does this matter? (Impact / Root Cause / Technical Risk)]

[Suggested solution with concrete code snippet or diff]
```

### Practical Example

#### ❌ Anti-pattern (Blunt, vague, unhelpful):
> "This is slow, rewrite with useMemo."
> "Why any?"
> "Fix this null check."

#### ✅ Best Practice (Constructive, explains the "Why", provides a code diff):
```markdown
**suggestion (perf):** The `calculateTotalSummary` function is recalculating over a large array on every single component re-render.

Because `items` only changes when products are added or removed, memoizing this calculation prevents CPU overhead during unrelated UI state transitions (like modal open/close).

```tsx
const totalSummary = useMemo(() => {
  return calculateTotalSummary(items);
}, [items]);
```
```

---

## 3. Review Etiquette & Collaboration Principles

1. **Critique the Code, Not the Person**:
   - ❌ *"You forgot to handle null here."*
   - ✅ *"The `user` object can be `null` when unauthenticated; adding optional chaining `user?.id` prevents a runtime TypeError."*
2. **Praise Openly & Authentically (`praise`)**:
   - Highlight at least 1–2 strengths in every review (e.g., great test coverage, clean component separation).
3. **Always Explain the "Why"**:
   - Provide the technical justification (e.g., race condition mitigation, bundle size optimization, type safety) rather than issuing arbitrary directives.
4. **Provide Actionable Code Diffs**:
   - Save time for the author by including precise code snippets or markdown diff blocks.
5. **Differentiate Requirements from Personal Preferences**:
   - If a comment reflects personal coding preference rather than an established team standard, label it `nit:` or `thought:` with a *(Personal preference)* note.
