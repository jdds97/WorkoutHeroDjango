MANAGE = python3 -m django

.PHONY: migrate
migrate: wait-for-db
	$(MANAGE) createcachetable
	$(MANAGE) migrate

.PHONY: migrations
migrations:
	$(MANAGE) makemigrations

.PHONY: messages
messages:
	$(MANAGE) makemessages -l nl

.PHONY: compilemessages
compilemessages:
	$(MANAGE) compilemessages

.PHONY: static
static:
	$(MANAGE) collectstatic --noinput

.PHONY: superuser
superuser:
	$(MANAGE) createsuperuser

.PHONY: shell
shell:
	$(MANAGE) shell

.PHONY: runserver
runserver: wait-for-db
	$(MANAGE) runserver 0.0.0.0:8000

.PHONY: uwsgi
uwsgi: static wait-for-db
	@uwsgi --socket 0.0.0.0:8000 \
		--plugins python3 \
		--processes=4 \
		--buffer-size=32768 \
		--wsgi-file SthenosFit/wsgi.py

.PHONY: wait-for-db
wait-for-db:
	@while ! nc -z "${DJANGO_DATABASE_HOST}" "${DJANGO_DATABASE_PORT}"; do \
		echo "Waiting for database..."; \
		sleep 1; \
	done

