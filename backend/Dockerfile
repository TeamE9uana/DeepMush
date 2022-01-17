FROM python:3.9

WORKDIR /backend

ENV DEBIAN_FRONTEND noninteractive

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN sed -i 's|archive.ubuntu.com|mirror.kakao.com|g' /etc/apt/sources.list

RUN apt update -y && apt install -y build-essential libpq-dev ffmpeg libsm6 libxext6

RUN mkdir -p ~/.pip && echo "[global]\n\
    index-url=http://mirror.kakao.com/pypi/simple\n\
    trusted-host=mirror.kakao.com" > ~/.pip/pip.conf

RUN mkdir -p /root/.cache/torch/hub && wget https://github.com/ultralytics/yolov5/archive/master.zip -P /root/.cache/torch/hub

RUN pip install --upgrade pip

COPY requirements.txt ./

# install rustup (rust compiler toolchain)
# original from https://github.com/linkerd/rustup-nightly-docker/blob/master/Dockerfile
# edit by DPS0340 (https://github.com/DPS0340)
RUN echo "(curl https://sh.rustup.rs -sSf | sh -s -- -y --default-toolchain nightly --no-modify-path) && rustup default nightly" > /install-rust.sh && \
    chmod 755 /install-rust.sh && \
    /install-rust.sh ; \
    rm -rf /install-rust.sh ; \
    exit 0

# install LibCST from source
RUN PATH="$HOME/.cargo/bin:$PATH" pip install libcst --no-binary libcst

RUN pip install psycopg2-binary --no-binary psycopg2-binary

RUN pip install -r requirements.txt --no-cache-dir

RUN pip install torch==1.10.1+cu113 -f https://download.pytorch.org/whl/cu113/torch_stable.html ; exit 0
RUN pip install torchvision==0.11.2+cu113 -f https://download.pytorch.org/whl/cu113/torch_stable.html ; exit 0
RUN pip install --upgrade certifi

COPY registry.py /usr/local/lib/python3.9/site-packages/django/apps/

RUN mkdir -p ./db
RUN chmod -R 777 ./db

COPY . .

EXPOSE 8000

ENTRYPOINT [ "/bin/bash", "./run.sh" ]