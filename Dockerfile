FROM ubuntu:18.04

RUN sed -i 's@archive.ubuntu.com@mirror.kakao.com@g' /etc/apt/sources.list

RUN apt-get -y update && apt-get -y dist-upgrade

RUN apt-get install -y apt-utils dialog

RUN apt-get install -y python3-pip python3-dev

ENV PYTHONUNBUFFERED=0

ENV PYTHONIOENCODING=utf-8

RUN pip3 install --upgrade pip
RUN pip3 install --upgrade setuptools

RUN mkdir /config

ADD /config/requirements.txt /config/

RUN apt-get install -y libmysqlclient-dev
RUN pip3 install -r /config/requirements.txt

RUN mkdir /BackEnd;

WORKDIR /BackEnd
