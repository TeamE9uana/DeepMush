#!/bin/bash

pip3 install -r requirements.txt

python3 manage.py makemigrations
python3 manage.py migrate

echo Starting Uvicorn.

uvicorn config.asgi:application --host 0.0.0.0 --workers 10 --reload