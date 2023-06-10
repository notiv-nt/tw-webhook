start:
	pm2 start --env production && \
	pm2 save

restart:
	git pull && \
	pm2 restart ./ecosystem.config.js --env production && \
	pm2 save

ssl:
	sudo add-apt-repository ppa:certbot/certbot && \
	sudo apt-get update && \
	sudo apt-get install certbot && \
	sudo certbot certonly --manual
