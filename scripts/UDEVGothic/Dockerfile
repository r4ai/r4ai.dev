# 使用する基本イメージ
FROM debian:bookworm@sha256:264982ff4d18000fa74540837e2c43ca5137a53a83f8f62c7b3803c0f0bdcd56

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
