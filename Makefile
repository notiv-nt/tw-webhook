start:
	pm2 start --env production && \
	pm2 save

restart:
	git pull && \
	pm2 restart ./ecosystem.config.js --env production && \
	pm2 save
