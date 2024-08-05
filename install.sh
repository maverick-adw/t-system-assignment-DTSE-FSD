apt update
apt install -y software-properties-common
add-apt-repository -y ppa:deadsnakes/ppa
ln -snf /usr/share/zoneinfo/$CONTAINER_TIMEZONE /etc/localtime && echo $CONTAINER_TIMEZONE > /etc/timezone
apt install -y python3.9
apt install -y python3.9-venv
apt install -y nodejs
apt install -y npm
npm install -g @angular/cli@18
apt install -y curl