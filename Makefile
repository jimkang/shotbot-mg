include config.mk

HOMEDIR = $(shell pwd)
SSHCMD = ssh $(USER)@$(SERVER)
PROJECTNAME = shotbot-mg
APPDIR = /opt/$(PROJECTNAME)

pushall: sync
	git push origin master

sync:
	rsync -a $(HOMEDIR) $(USER)@$(SERVER):/opt --exclude node_modules/
	$(SSHCMD) "cd $(APPDIR) && npm install"

run-hills:
	BOT=hills node post-shot.js

run-hills-dry:
	BOT=hills node post-shot.js --dry

prettier:
	prettier --single-quote --write "**/*.js"

install-fonts:
	$(SSHCMD) "cd $(APPDIR) && sudo cp fonts/*.otf /usr/local/share/fonts && \
	  fc-cache && fc-list"
