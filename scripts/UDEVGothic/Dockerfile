# 使用する基本イメージ
FROM debian:12@sha256:854dd8ab51d62866dbd8f5431d15ce77b12983a2a4a1e1fe43a2395dc7ef9f61

# 必要なパッケージのインストール
RUN apt-get update && \
    apt-get install -y git cmake build-essential

# woff2 リポジトリのクローン
RUN git clone --recursive https://github.com/google/woff2.git

# woff2 ディレクトリに移動
WORKDIR /woff2

# woff2 ツールのビルド
RUN make clean all

# ホストのフォントディレクトリをコンテナにマウントするディレクトリを作成
RUN mkdir /fonts

# フォント変換スクリプトの追加
COPY convert-fonts.sh /usr/local/bin/convert-fonts.sh
RUN chmod +x /usr/local/bin/convert-fonts.sh

# フォント変換スクリプトを実行
CMD ["convert-fonts.sh"]
