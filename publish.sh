#/bin/bash
docker build . -t web && heroku container:push web && heroku container:release web
