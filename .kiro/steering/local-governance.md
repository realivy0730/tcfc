---
type: governance
name: local-governance
updated: "2026-05-31"
source: "~/.kiro/steering/on-demand"
---

# Local Governance Entry

This file keeps project `.kiro/steering` compact. Reusable lifecycle, docs, issue, and agent rules live in global Kiro steering. Keep only local project deltas here.

## Project Facts

| Field | Value |
|---|---|
| Repository | `/Users/boday/工作/Kiro/tcfc` |
| Platform | `GitHub` |
| Current branch at audit | `develop` |
| Remote | `https://github.com/realivy0730/tcfc.git` |
| Tracker | `GitHub Issue (Redmine: N/A unless project overrides)` |
| Docs index | `docs/00_Meta/INDEX.md` |

## Required Global Steering

- `~/.kiro/steering/global-rules.md`
- `~/.kiro/steering/context-budget.md`
- `~/.kiro/steering/on-demand/repo-lifecycle-standard.md`
- `~/.kiro/steering/on-demand/issue-driven-development.md`
- `~/.kiro/steering/on-demand/kb-sync-workflow.md`
- `~/.kiro/steering/on-demand/llmwiki-knowledge-pattern.md`
- `~/.kiro/steering/on-demand/agent-permission-boundaries.md`

## Local Workflow

1. Read project `AGENTS.md`, `.codex/*`, `.kiro/steering/*`, and `docs/00_Meta/INDEX.md` before changing files.
2. Create or update `GitHub Issue (Redmine: N/A unless project overrides)` before implementation.
3. Use an issue branch; never write directly to protected branches.
4. Before MR / PR, update README, CHANGELOG, docs index, and issue content.
5. After merge, create `GitHub release/tag`, then close GitHub issue.
6. If Kiro knowledge index must be rebuilt, record the Kiro runtime follow-up in the issue / MR / PR.

## Local Delta Rule

Add project-specific constraints in separate steering files. Do not duplicate global lifecycle text here unless this repo intentionally differs.
