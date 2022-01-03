FROM python:3.9

WORKDIR /backend

ENV DEBIAN_FRONTEND noninteractive

RUN pip install --upgrade pip

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY requirements.txt ./

RUN pip install -r requirements.txt --no-cache-dir

COPY registry.py /usr/local/lib/python3.9/site-packages/django/apps/

RUN mkdir -p ./db
RUN chmod -R 777 ./db

COPY . .

EXPOSE 8000

ENTRYPOINT [ "/bin/bash", "./run.sh" ]