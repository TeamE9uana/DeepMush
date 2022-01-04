FROM postgres:latest

ENV DEBIAN_FRONTEND noninteractive

RUN apt update -y && apt install -y sudo

RUN useradd -ms /bin/bash ubuntu && \
    usermod -aG sudo ubuntu

RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

USER ubuntu
WORKDIR /home/ubuntu

ENV DEBIAN_FRONTEND teletype

ENTRYPOINT [ "/scripts/start-db.sh" ]