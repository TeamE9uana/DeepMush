from pathlib import Path
import os
import json
from django.core.exceptions import ImproperlyConfigured

BASE_DIR = Path(__file__).resolve().parent.parent

secret_file = os.path.join(BASE_DIR, 'secrets.json')  # secrets.json 파일 위치를 명시

secrets = {}
if os.path.isfile(secret_file):
    with open(secret_file) as f:
        secrets = json.loads(f.read())


def get_secret(key: str, default_value: str = '', *, secrets: dict = secrets) -> any:
    return secrets.get(key, default_value)
