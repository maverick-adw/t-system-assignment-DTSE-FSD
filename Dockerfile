FROM ubuntu:22.04

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN apt update
RUN apt install -y software-properties-common
RUN add-apt-repository -y ppa:deadsnakes/ppa
RUN ln -snf /usr/share/zoneinfo/$CONTAINER_TIMEZONE /etc/localtime && echo $CONTAINER_TIMEZONE > /etc/timezone
RUN apt install -y python3.9
RUN apt install -y python3.9-venv
RUN apt install -y nodejs
RUN apt install -y npm
RUN npm install -g @angular/cli@18
RUN apt install -y curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
RUN . ~/.nvm/nvm.sh && nvm install 18 && nvm use 18
# RUN nvm install 18
# RUN nvm use 18

RUN mkdir -p /app
COPY . /app
WORKDIR /app
RUN rm -rf venv
RUN python3.9 -m venv ./venv
ENV PATH="/app/venv/bin:$PATH"
RUN pip install -r requirements.txt
RUN uvicorn backend:app &

WORKDIR /app/frontend
RUN npm install 
RUN ng serve &