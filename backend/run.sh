#!/bin/bash

pip3 install -r requirements.txt

python3 manage.py makemigrations
python3 manage.py migrate auth --run-syncdb
python3 manage.py migrate --run-syncdb

echo Starting Uvicorn.

uvicorn config.asgi:application --host 0.0.0.0 --workers 10 --reload