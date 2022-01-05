#!/bin/bash

pip3 install -r requirements.txt

python3 manage.py makemigrations
python3 manage.py migrate --run-syncdb

echo Starting Gunicorn.

gunicorn config.wsgi:application --bind=0.0.0.0:8000 -w 8 --threads 8 -k gthread --reload