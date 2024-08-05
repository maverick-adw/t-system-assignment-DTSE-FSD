FROM ubuntu:22.04
RUN mkdir -p /app
COPY . /app
WORKDIR /app
RUN bash install.sh
# CMD ["bash", "run.sh", "|", "tee", "log.txt"]