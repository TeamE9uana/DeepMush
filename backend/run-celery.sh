#!/bin/bash

pip3 install -r requirements.txt

python3 manage.py makemigrations
python3 manage.py migrate --run-syncdb

echo Starting celery worker.

exec celery -A config worker -l INFO -P threads -c 3