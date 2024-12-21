# 使用する基本イメージ
FROM debian:bookworm@sha256:17122fe3d66916e55c0cbd5bbf54bb3f87b3582f4d86a755a0fd3498d360f91b

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
