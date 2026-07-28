---
name: turnstile-spin
description: Cloudflare Turnstile をプロジェクトへ設定・検証するときに使用する共有スキル入口。
---

# Turnstile Spin（Codex 入口）

このファイルは Codex のスキル検出用入口です。スキル本体の SSOT は
`.claude/skills/turnstile-spin/SKILL.md` にあります。

このスキルを使用するときは、先に本体の `SKILL.md` を全文読み、そこから参照される
`references/`、`scripts/`、`templates/` は `.claude/skills/turnstile-spin/` を基準に解決してください。

本体と本ファイルが矛盾する場合は、本体を優先します。
