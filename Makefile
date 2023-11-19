prepare:
	npm i -g pm2

start:
	pm2 start ./ecosystem.config.js --env production
	pm2 save
	pm2 list

update:
	git pull && \
	npm i && \
	pm2 restart ./ecosystem.config.js --env production && \
	pm2 save

ssl:
	apt-get install certbot -y && \
	certbot certonly --manual

install-node:
	apt-get update
	apt-get install -y ca-certificates curl gnupg
	mkdir -p /etc/apt/keyrings
	curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
	NODE_MAJOR=20 && printf "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
	apt-get update
	apt-get install nodejs -y
