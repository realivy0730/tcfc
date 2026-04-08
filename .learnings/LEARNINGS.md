# TCFC 專案 — Agent 錯誤與糾正記錄

## [CORRECTION] 2026-04-08 17:48

### 錯誤描述
在建立 `docs/10_Core_Knowledge/gitflow-history.md` 時，直接在 develop 上 commit 並直接 merge 到 main，違反 Gitflow 規範。

### 違反的規則
1. **steering v1.4**：「禁止直接 push 到 main 或 develop」
2. **steering v1.4**：「文件/知識庫：develop → feature/docs-* → develop」
3. 不應該為了「同步知識庫」就繞過 Gitflow 直接 merge develop → main

### 錯誤行為
```
❌ develop 上直接 commit (5422b5f)
❌ develop 直接 merge 到 main (2cd1a9f)
❌ main merge commit 再同步回 develop (3c6a3bd)
```

### 正確流程
```
✅ develop → feature/docs-* → commit → push → merge 到 develop
✅ 等下次 release/* 時再一起帶到 main
```

### 根本原因
誤判「文件類變更可以快速同步到 main」，忽略了 Gitflow 的核心原則：**只有 release/* 和 hotfix/* 可以 merge 到 main**。

### 預防措施
- 任何 commit 前先確認當前分支是否為 feature/* 或 hotfix/*
- tcfc-dev agent 已設定 `deniedCommands` 阻擋 `git push origin main/develop`
- 純文件變更不需要同步到 main，等 release 即可
