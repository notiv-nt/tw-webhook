start:
	pm2 start --env production && \
	pm2 save

restart:
	git pull && \
	pm2 restart all --env production && \
	pm2 save
