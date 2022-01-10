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

RUN pip install psycopg2-binary --no-binary psycopg2-binary

RUN pip install -r requirements.txt --no-cache-dir

RUN pip install torch==1.10.1+cu113 -f https://download.pytorch.org/whl/cu113/torch_stable.html

COPY registry.py /usr/local/lib/python3.9/site-packages/django/apps/

RUN mkdir -p ./db
RUN chmod -R 777 ./db

COPY . .

EXPOSE 8000

ENTRYPOINT [ "/bin/bash", "./run.sh" ]