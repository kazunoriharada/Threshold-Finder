# Threshold-Finder
Alpha 1.0

- このプログラムは、2つの音声を聞いて残響の違いを判断する一対比較を行い、その結果をCSVファイルとして出力するプログラムです。残響時間の弁別閾値を求める用途を想定しています。
  - This program is designed to perform a paired comparison of two sounds to determine the difference in reverberation, and output the results as a CSV file. It is intended to find the discrimination threshold of reverberation time.

## 使い方

1. このリポジトリをクローンします。
2. TestSignalフォルダに比較対象の音声ファイルを入れます。このとき、ファイル名は0.0.wavの形式としてください。
3. app.pyの`subuject_id`, `updown`を設定します。TestSignalのフォルダ名を変更している場合は`signal`も変更してください。
4. app.pyを実行し、実行環境に表示されるURLにアクセスします。

## How to use

1. Clone this repository.
2. Put the sound files to be compared in the TestSignal folder. At this time, please name the file in the form of 0.0.wav.
3. Set `subuject_id` and `updown` in app.py. If you have changed the folder name of TestSignal, please also change `signal`.
4. Run app.py and access the URL displayed in the execution environment.

## 注意点

- 現状まだα板のため、バグがある可能性があります。
  - Currently, it is still in beta, so there may be bugs.
- 冗長な箇所も多いため、今後リファクタリングを行う予定です。
  - There are many redundant parts, but I plan to refactor them in the future.

## Requirement

- flask
