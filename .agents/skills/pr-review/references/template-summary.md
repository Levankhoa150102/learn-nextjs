# Pull Request Review Summary Template

Use this structured template to provide an executive summary and comprehensive review feedback for any Pull Request.

---

```markdown
# 📋 Pull Request Review Summary

## 📌 Overview
- **PR Scope / Goal:** [Brief description of what this PR introduces]
- **Change Type:** 🌟 Feature / 🐛 Bug Fix / ⚡ Performance / ♻️ Refactor / 🔒 Security / 🧹 Chore
- **Risk Assessment:** 🟢 Low / 🟡 Medium / 🔴 High
- **Executive Summary:** [2-3 sentences summarizing overall code health, readiness, and impact]

---

## 🌟 Key Strengths & Praise
- [Point 1: e.g., Clean architecture and separation of concerns]
- [Point 2: e.g., Thorough test coverage with edge-case handling]

---

## 🚨 Actionable Feedback

### 🔴 Must Fix / Blockers
> *Critical bugs, security vulnerabilities, runtime crashes, or architectural violations.*

- **[File path / Line number]**: [Description of issue & impact]
  ```diff
  - problematic code
  + suggested fix
  ```

### 🟡 Suggestions & Improvements
> *Opportunities for performance gains, cleaner abstractions, or enhanced type safety.*

- **[File path / Line number]**: [Improvement suggestion with technical justification]

### 🟢 Nits & Polish
> *Minor cosmetic adjustments, formatting, or naming tweaks.*

- **[File path / Line number]**: [Detail]

---

## 🧪 Verification & Testing Recommendations
- [ ] Test scenario 1: [Validate core happy-path behavior]
- [ ] Test scenario 2: [Validate error state, network timeout, or edge boundary]

---

## 🏁 Final Verdict
- [ ] **✅ Approved (LGTM)**: High-quality code; ready to merge.
- [ ] **🟡 Approved with Comments**: Ready to merge once minor `nit` / `suggestion` items are addressed.
- [ ] **🔴 Request Changes**: Critical `fix` / `blocker` issues must be addressed before approval.
```
