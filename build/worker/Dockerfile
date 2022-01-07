FROM continuumio/anaconda3:latest

WORKDIR /backend

ENV DEBIAN_FRONTEND noninteractive

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN sed -i 's|archive.ubuntu.com|mirror.kakao.com|g' /etc/apt/sources.list

RUN apt update -y && apt install -y build-essential libpq-dev sudo

RUN mkdir -p ~/.pip && echo "[global]\n\
    index-url=http://mirror.kakao.com/pypi/simple\n\
    trusted-host=mirror.kakao.com" > ~/.pip/pip.conf

RUN pip install --upgrade pip

COPY requirements.txt ./

RUN pip install psycopg2-binary --no-binary psycopg2-binary

RUN pip install -r requirements.txt --no-cache-dir

COPY ./scripts .

RUN cd ./scripts && ./scripts/install-cuda.sh && cd ..

# pytorch cuda 호환 버전을 11.3으로 변경해주면서 cuda 관련 오류 해결
RUN conda install pytorch torchvision torchaudio cudatoolkit=11.3 -c pytorch

COPY registry.py /usr/local/lib/python3.9/site-packages/django/apps/

RUN mkdir -p ./db
RUN chmod -R 777 ./db

COPY . .

EXPOSE 8000

ENTRYPOINT [ "/bin/bash", "./run-celery.sh" ]