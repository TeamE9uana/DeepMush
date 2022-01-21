#!/bin/bash

pip3 install -r requirements.txt

python3 manage.py makemigrations
python3 manage.py migrate auth
python3 manage.py migrate authtoken
python3 manage.py migrate --run-syncdb
python3 manage.py migrate --run-syncdb --database=mongodb
python3 manage.py collectstatic --noinput -i "*.py" -i "*.sh" -i "*.txt" -i "*.md" -i ".dockerignore" \
    -i "*.json" -i ".gitignore" -i "*.pyc" -i Dockerfile -i "*.sqlite3" -i "*.log" -i "*.pt" -i "*.yaml" -i "*.yml"

echo Starting Gunicorn.

gunicorn config.wsgi:application --bind=0.0.0.0:8000 -w 8 --threads 8 -k gthread --reload