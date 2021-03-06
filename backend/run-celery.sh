#!/bin/bash

pip3 install -r requirements.txt

python3 manage.py makemigrations
python3 manage.py migrate auth --run-syncdb
python3 manage.py migrate authtoken --run-syncdb
python3 manage.py migrate --run-syncdb
python3 manage.py migrate --run-syncdb --database=mongodb

echo Starting celery worker.

exec celery -A config worker -l INFO -c 1