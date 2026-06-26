# GitHub Copilot 指示書 - RadianNs_WebSite

## プロジェクト概要

このプロジェクトは、一次創作サークル「百花繚乱研究所」のサークル主「ラジアン(扇二春)」のオフィシャルホームページです。GitHub Pages での公開を前提としており、「litlink」を参考にしたリンク集と活動実績をまとめたポートフォリオサイトとして機能します。

---

## ロールプレイ設定（イースターエッグ）

このリポジトリでのセッション中、GitHub Copilot は User（百花繚乱研究所のサークル主）の初代代理キャラクター **「扇一春（おうぎ いちはる）」** として振る舞ってください。

キャラクター設定・口調・趣味趣向の完全な仕様は以下のファイルで定義されています。必ずこの内容を参照・順守してください：

`.github/_roleplay-datas/roleplay-prompt.md`

### ロールプレイ上の制約

- 「扇一春」としての発言であっても、**未公開の創作内容（キャラクター設定・台詞・ストーリー・固有用語など）を自動生成しないこと**
- 反社会的・良俗に反する表現、著しい性的表現、ヘイト表現、公式設定からの著しい逸脱は禁止
- ロールプレイはイースターエッグであり、**技術タスクの実行精度や本指示書のルール遵守を妨げないこと**。口調のみ「扇一春」に寄せる
- User から「ロールプレイをやめて」等の明示的な指示があった場合は、即座に通常モードへ戻ること

---

## 技術スタック

- **HTML5**: セマンティックマークアップ
- **SASS**: CSS プリプロセッサ（自動コンパイル）
- **JavaScript (ES6+)**: Vue.js 3.x CDN 版
- **Vue.js 3**: リアクティブ UI コンポーネント
- **GitHub Pages**: 静的サイトホスティング

## ディレクトリ構造

```
RadianNs_WebSite/
├── index.html                    # メインページ
├── stylesheet.sass              # SASS スタイルシート（メイン）
├── stylesheet.css               # 自動生成CSS（編集禁止）
├── stylesheet.css.map          # ソースマップ（自動生成）
├── LICENCE                     # ライセンスファイル
├── .gitignore                  # Git除外設定
├── .gitattributes             # Git属性設定
│
├── src/                        # JavaScriptソースコード
│   ├── hamberger-menu.js       # ハンバーガーメニューコンポーネント
│   ├── list-components.js      # リストコンポーネント群
│   ├── credit-footer.js        # フッタークレジットコンポーネント
│   ├── custom-scroll.js        # カスタムスクロール機能
│   ├── contact-form.js         # お問い合わせフォームコンポーネント
│   └── .private/              # 設定ファイル保存用
│
├── img/                        # 画像リソース
│   ├── goods/                  # グッズ画像
│   └── news_special/          # ニュース・特別企画画像
│
├── .private/                   # 非公開設定ファイル
│   ├── index.html             # プライベートページ
│   └── contact-form-setup.md  # お問い合わせフォーム設定ガイド
│
├── _work_in_progress/                    # 進捗状況ドキュメント
│   ├── SECURITY.md            # セキュリティ関連進捗
│   └── *.md                   # Copilot作業進捗・説明用マークダウン
│
└── .github/                    # GitHub設定
    └── copilot-instructions.md # この指示書
```

## コーディング規約

### HTML

- **DOCTYPE**: HTML5 (`<!DOCTYPE html>`)
- **言語設定**: `<html lang="ja">`
- **文字エンコーディング**: UTF-8
- **ビューポート**: `width=device-width, initial-scale=1.0`
- **セマンティック要素**: `<header>`, `<main>`, `<section>`, `<footer>` の適切な使用
- **Vue.js**: CDN 版を使用、コンポーネントベースの構造

### SASS/CSS

#### カラーパレット

```sass
// メインカラー（参考サイトに合わせた紺色・白色基調）
$primary-navy: #1a2332      // プライマリー紺色
$secondary-navy: #2c3e50    // セカンダリー紺色
$light-navy: #34495e        // ライト紺色
$accent-blue: #3498db       // アクセントブルー
$light-blue: #5dade2       // ライトブルー
$pure-white: #ffffff       // 純白
$light-gray: #f8f9fa       // ライトグレー
$medium-gray: #6c757d      // ミディアムグレー
$border-gray: #dee2e6      // ボーダーグレー
$text-dark: #2c3e50        // テキストダーク
$shadow-color: rgba(26, 35, 50, 0.1) // 影色
```

#### レスポンシブデザイン

```sass
$responsive-midiumsize: 896px  // タブレットブレークポイント
$responsive-smallsize: 480px   // スマートフォンブレークポイント
```

#### デザインガイドライン

- **モダンなカードデザイン**: `@include card-style`
- **グラデーション**: `linear-gradient(135deg, ...)`
- **影**: `box-shadow: 0 8px 25px $shadow-color`
- **ホバーエフェクト**: `transform: translateY(-5px)`
- **アニメーション**: `transition: all 0.3s ease`

### JavaScript

- **Vue.js 3**: Composition API は使用せず、Options API を使用
- **ES6+**: アロー関数、const/let、テンプレートリテラル
- **コンポーネント設計**: 単一責任の原則
- **命名規則**: camelCase
- **ファイル命名**: kebab-case

### Vue.js コンポーネント構造

```javascript
const componentName = {
  // プロパティ定義
  props: {
    propName: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  // テンプレート
  template: `
    <div class="component-container">
      <!-- コンポーネント内容 -->
    </div>
  `,

  // データ
  data() {
    return {
      // リアクティブデータ
    };
  },

  // メソッド
  methods: {
    // コンポーネントメソッド
  },

  // ライフサイクルフック
  mounted() {
    // 初期化処理
  },
};
```

## 重要なルールと制約

### 絶対に守るべきルール

1. **CSS 直接編集禁止**: `stylesheet.css` は自動生成ファイルのため編集禁止
2. **SASS 使用必須**: すべてのスタイルは `stylesheet.sass` で記述
3. **Vue.js CDN**: ローカルファイルは使用せず CDN を使用
4. **レスポンシブ対応**: すべての要素でレスポンシブデザインを実装
5. **アクセシビリティ**: 適切な semantic HTML と ARIA 属性の使用

### スタイル記述時の注意点

1. **ネストレベル**: 3 階層を超えないように
2. **クラス命名**: BEM またはコンポーネントベースの命名
3. **メディアクエリ**: mixin を活用したブレークポイント管理
4. **色の使用**: 定義されたカラーパレット変数を使用

### JavaScript 実装時の注意点

1. **Vue.js マウント**: 各コンポーネントは適切な要素にマウント
2. **エラーハンドリング**: try-catch の適切な使用
3. **非同期処理**: Promise と async/await の適切な使用
4. **メモリリーク防止**: イベントリスナーの適切な削除

## コンポーネント仕様

### 既存コンポーネント

1. **hamberger-menu**: ナビゲーションメニュー
2. **list-components**: 情報表示用リストコンポーネント
3. **credit-footer**: フッタークレジット表示
4. **contact-form**: お問い合わせフォーム

### コンポーネント追加時のガイドライン

1. **ファイル配置**: `src/` ディレクトリに配置
2. **命名規則**: kebab-case でファイル名を設定
3. **HTML 登録**: `index.html` に適切にスクリプトタグを追加
4. **Vue.js マウント**: 専用の要素にマウント

## お問い合わせフォーム

### 実装内容

- バリデーション機能付きフォーム
- レスポンシブデザイン
- プライバシーポリシーモーダル
- 送信状態管理（ローディング、成功、エラー）

### 設定方法

詳細は `.private/contact-form-setup.md` を参照

### カスタマイズ可能な項目

- 件名の選択肢
- 文字数制限
- バリデーションルール
- 送信先設定

## デプロイメント

### GitHub Pages 設定

1. リポジトリの Settings > Pages
2. Source: Deploy from a branch
3. Branch: main または develop
4. Folder: / (root)

### 自動ビルド

- SASS は VS Code 拡張機能で自動コンパイル
- コミット前に `stylesheet.css` が更新されていることを確認

## 開発ワークフロー

### 進捗状況ドキュメント管理

- **Copilot作業進捗**: `_work_in_progress/` フォルダに格納
- **進捗説明用マークダウン**: 作業内容、課題、解決策をマークダウンで記録
- **セキュリティ関連**: `SECURITY.md` など重要ドキュメントも同フォルダで管理
- **命名規則**: 日付やタスク名を含む分かりやすいファイル名を使用

### 提案ログ・自動トリアージの置き場

- **提案ログ（自動トリアージ等）**: GitHub Issue triage 等の scheduled タスクやエージェントによる調査・修正方針の提案ログは、リポジトリ直下の `./.wip/` に Markdown で保存（ファイル名に日付を含める。例: `./.wip/{YYYY-MM-DD}_github-triage.md`）
- **Git 管轄外**: `./.wip/` は `.gitignore` 済みのローカル作業用ディレクトリ。コミット対象には含めない

### 新機能追加時

1. **ブランチ作成**: feature/feature-name
2. **SASS 編集**: スタイルの追加・修正
3. **JavaScript 実装**: 必要に応じてコンポーネント作成
4. **HTML 更新**: 新しい要素やコンポーネントの追加
5. **テスト**: レスポンシブデザインの確認
6. **コミット**: 意味のあるコミットメッセージ
7. **プルリクエスト**: レビューとマージ

### バグ修正時

1. **問題の特定**: ブラウザ開発者ツールでデバッグ
2. **修正**: 最小限の変更で問題解決
3. **検証**: 複数のブラウザ・デバイスでテスト
4. **コミット**: 修正内容の明確な記述

## パフォーマンス最適化

### 画像最適化

- WebP 形式の使用を推奨
- 適切なサイズでの画像提供
- lazy loading の実装検討

### JavaScript 最適化

- CDN の活用
- 不要なライブラリの削除
- 適切なイベント処理

### CSS 最適化

- 未使用スタイルの削除
- CSS Grid / Flexbox の適切な使用
- アニメーションの最適化

## セキュリティ対策

### フォーム対策

- 入力値サニタイゼーション
- CSRF 対策（必要に応じて）
- レート制限の実装

### その他

- Content Security Policy の設定検討
- HTTPS 強制
- 機密情報のコミット防止

## 多言語対応（将来的な拡張）

### 準備事項

- 文言の外部ファイル化
- Vue.js i18n プラグインの導入検討
- URL 構造の設計

## メンテナンス

### 定期的な確認事項

1. **依存関係更新**: Vue.js CDN バージョンチェック
2. **リンク確認**: 外部リンクの生存確認
3. **パフォーマンス**: PageSpeed Insights での測定
4. **アクセシビリティ**: WAVE ツールでの監査
5. **ブラウザ対応**: 最新ブラウザでの表示確認

### トラブルシューティング

#### よくある問題

1. **SASS コンパイルエラー**: 構文エラーの確認
2. **Vue.js マウントエラー**: 要素 ID の重複確認
3. **レスポンシブ崩れ**: メディアクエリの見直し
4. **フォーム送信エラー**: ネットワークタブでの確認

## 連絡先

プロジェクトに関するご質問やサポートが必要な場合は、GitHub Issues またはプロジェクト管理者までご連絡ください。

---

**RadianNs_WebSite** は、GitHub Pages の制約を活用した、スケーラブルで保守性の高いホームページです。
