# 使用する基本イメージ
FROM debian:bookworm@sha256:4abf773f2a570e6873259c4e3ba16de6c6268fb571fd46ec80be7c67822823b3

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
