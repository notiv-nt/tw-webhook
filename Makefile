start:
	pm2 start --env production && \
	pm2 save

restart:
	git pull && \
	pm2 restart --env production && \
	pm2 save
