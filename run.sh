cd /app
rm -rf venv
python3.9 -m venv ./venv
export PATH="/app/venv/bin:$PATH"
pip install -r requirements.txt
uvicorn backend:app &

cd /app/frontend
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash # TODO: Expects user input
source ~/.nvm/nvm.sh
nvm install 18
nvm use 18
npm install
ng serve &