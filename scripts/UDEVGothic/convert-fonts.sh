#!/bin/bash
# フォントディレクトリに移動
cd /fonts

# TTF ファイルを WOFF2 に変換
for font in *.ttf; do
    /woff2/woff2_compress "$font"
done
