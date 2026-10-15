# TypeScript 7 実践入門 練習用ファイル

書籍『TypeScript 7 実践入門 基礎からフロントエンド・バックエンド開発まで』（早瀬 透）の練習用ファイルです。

本では、タスク管理の Web アプリ「tasks」を1冊を通して育てます。このリポジトリには、**各章を終えた時点の tasks** が入っています。
本文のコードの枠と、その章の練習用ファイルは同じ内容です。
このページ（main）は第1章を始める前の状態なので、README と LICENSE だけが並んでいます。各章のファイルは、下の表の［ファイルを見る］か［ZIP］から開いてください。

- 本のコードを打つ代わりに、ここからコピーして貼り付ける
- 書いたコードが動かないとき、本のとおりのファイルと見比べる
- 途中の章から読み始めるとき、前の章の終わりの状態をそろえる

といった使い方をしてください。

## 本

- Kindle 版: https://www.amazon.co.jp/dp/B0HMNRJ8C1
- 紙の本（ペーパーバック）: https://www.amazon.co.jp/dp/B0HMNTRJFK

## ファイルを入手する方法

入手する方法は3つあります。やりたいことに合わせて選んでください。

| やりたいこと | 方法 |
|---|---|
| 1つのファイルだけ見比べたい・コピーしたい | 下の表の［ファイルを見る］から、ブラウザーでファイルを開く。中身の右上の、四角が2つ重なったボタン（Copy raw file）でコピーできます |
| ある章の終わりの tasks を全部手元に置きたい | 下の表の［ZIP］を押してダウンロードし、展開する |
| 全部の章を手元に置いて、章を切り替えたい | `git clone` でクローンし、`git checkout ch05` のように切り替える（下の「git でクローンする方法」） |

| 章 | ファイルを見る | ZIP でダウンロード |
|---|---|---|
| 第1章　TypeScript 7 をインストールして、最初のファイルを動かす | [ch01](https://github.com/fairview2311/typescript7-jissen-samples/tree/ch01/tasks) | [ch01.zip](https://github.com/fairview2311/typescript7-jissen-samples/archive/refs/tags/ch01.zip) |
| 第2章　VS Code で TypeScript を開発する | [ch02](https://github.com/fairview2311/typescript7-jissen-samples/tree/ch02/tasks) | [ch02.zip](https://github.com/fairview2311/typescript7-jissen-samples/archive/refs/tags/ch02.zip) |
| 第3章　型の基本　タスク1件を型で書く | [ch03](https://github.com/fairview2311/typescript7-jissen-samples/tree/ch03/tasks) | [ch03.zip](https://github.com/fairview2311/typescript7-jissen-samples/archive/refs/tags/ch03.zip) |
| 第4章　オブジェクトと配列の型　タスクの一覧を表す | [ch04](https://github.com/fairview2311/typescript7-jissen-samples/tree/ch04/tasks) | [ch04.zip](https://github.com/fairview2311/typescript7-jissen-samples/archive/refs/tags/ch04.zip) |
| 第5章　関数と型　一覧を絞り込んで並べる | [ch05](https://github.com/fairview2311/typescript7-jissen-samples/tree/ch05/tasks) | [ch05.zip](https://github.com/fairview2311/typescript7-jissen-samples/archive/refs/tags/ch05.zip) |
| 第6章　ユニオン型とリテラル型　状態と優先度を決まった値にする | [ch06](https://github.com/fairview2311/typescript7-jissen-samples/tree/ch06/tasks) | [ch06.zip](https://github.com/fairview2311/typescript7-jissen-samples/archive/refs/tags/ch06.zip) |
| 第7章　null と undefined　入力の間違いで止まらないようにする | [ch07](https://github.com/fairview2311/typescript7-jissen-samples/tree/ch07/tasks) | [ch07.zip](https://github.com/fairview2311/typescript7-jissen-samples/archive/refs/tags/ch07.zip) |
| 第8章　モジュールと tsconfig.json　TypeScript 7 の設定を読む | [ch08](https://github.com/fairview2311/typescript7-jissen-samples/tree/ch08/tasks) | [ch08.zip](https://github.com/fairview2311/typescript7-jissen-samples/archive/refs/tags/ch08.zip) |
| 第9章　バックエンド　Hono でタスクの API を作る | [ch09](https://github.com/fairview2311/typescript7-jissen-samples/tree/ch09/tasks) | [ch09.zip](https://github.com/fairview2311/typescript7-jissen-samples/archive/refs/tags/ch09.zip) |
| 第10章　データベースに保存する　Drizzle と SQLite | [ch10](https://github.com/fairview2311/typescript7-jissen-samples/tree/ch10/tasks) | [ch10.zip](https://github.com/fairview2311/typescript7-jissen-samples/archive/refs/tags/ch10.zip) |
| 第11章　フロントエンド　React で画面を作る | [ch11](https://github.com/fairview2311/typescript7-jissen-samples/tree/ch11/tasks) | [ch11.zip](https://github.com/fairview2311/typescript7-jissen-samples/archive/refs/tags/ch11.zip) |
| 第12章　同じ型をフロントエンドとバックエンドで使う | [ch12](https://github.com/fairview2311/typescript7-jissen-samples/tree/ch12/tasks) | [ch12.zip](https://github.com/fairview2311/typescript7-jissen-samples/archive/refs/tags/ch12.zip) |
| 第13章　テストと型チェックで仕上げる | [ch13](https://github.com/fairview2311/typescript7-jissen-samples/tree/ch13/tasks) | [ch13.zip](https://github.com/fairview2311/typescript7-jissen-samples/archive/refs/tags/ch13.zip) |

前の章の終わりは、次の章の始まりと同じです。たとえば第5章から読み始めるときは、第4章の ZIP を使います。

## ZIP でダウンロードする方法

1. 上の表の「ZIP でダウンロード」の列から、使う章の ZIP（`ch03.zip` など）を押してダウンロードします
2. ZIP を展開します（Windows はファイルを右クリックして［すべて展開］、Mac はダブルクリック）。`typescript7-jissen-samples-ch03` のような名前のフォルダーができ、その中に `tasks` フォルダーがあります
3. `tasks` フォルダーを、VS Code の［ファイル］メニューの［フォルダーを開く...］（Mac は［開く...］）で開きます
4. ［ターミナル］メニューの［新しいターミナル］でターミナルを開き、`npm install` を打ちます

`node_modules` と `dist` は入っていません。`npm install` と `npx tsc` で作られるためです。動かし方は、その章の本文のとおりです。

## git でクローンする方法

Git をインストールしている人は、ターミナルで次のように打ちます。

```text
git clone https://github.com/fairview2311/typescript7-jissen-samples.git
cd typescript7-jissen-samples
git checkout ch05
```

`ch01`〜`ch13` は Git のタグ（ある時点のファイルに付けた名前）です。`git checkout ch05` で第5章の終わりの状態になります。自分で書き換えたファイルは、切り替える前に別の場所へ写しておいてください。

ブランチは2つあります。

- `main`: 第1章を始める前の状態
- `solutions`: 第13章を終えた完成形

## 動かす環境

Node.js 24 以降（LTS）、TypeScript 7.0、VS Code と拡張機能「TypeScript 7」。インストールの手順は本の第1章にあります。

## ライセンス

MIT License（LICENSE）
