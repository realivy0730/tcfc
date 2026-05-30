# GitHub Issue-to-Release 治理標準

本文件對齊 boday/trend-pulse#250，作為 TCFC 的 docs canonical 入口。

## 追蹤鏈

```text
GitHub Issue ↔ Branch ↔ PR ↔ Merge ↔ Release Version ↔ Close Issue
```

## 規則

- 任務先建立 GitHub issue，本輪對應 realivy0730/tcfc#2。
- 本專案採 Gitflow；文件治理分支從 `develop` 建立，PR base 為 `develop`。
- PR 前同步 README、docs/00_Meta/changelog.md、docs/00_Meta/INDEX.md。
- Merge 到 `develop` 後，再由 release 流程進 main、建立 release/tag、close issue。
- Codex 不修改 `.kiro/steering`，也不執行 `knowledge update`；Kiro index rebuild 記為 follow-up。
