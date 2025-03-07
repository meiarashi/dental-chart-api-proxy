# Dental Chart AI API Proxy

このサーバーは歯科チャートAIアプリケーションのAPIプロキシとして機能し、CORSの問題を解決します。

## 機能
- Anthropic Claude APIへのリクエストを中継
- CORSヘッダーの適切な設定
- 大きな画像ファイルのBase64エンコードデータの処理

## セットアップ
1. `.env`ファイルに`CLAUDE_API_KEY`を設定
2. `npm install`で依存関係をインストール
3. `npm start`でサーバーを起動

## エンドポイント
- GET `/`: ヘルスチェック
- POST `/api/analyze-dental-images`: 歯科画像の解析

## Renderへのデプロイ
1. このリポジトリをGitHubにプッシュ
2. Renderで新しいWebサービスを作成し、このリポジトリと連携
3. 環境変数`CLAUDE_API_KEY`を設定
4. デプロイを実行