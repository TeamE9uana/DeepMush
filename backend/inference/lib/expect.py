from io import BytesIO
import numpy as np
from PIL import Image as PILImage
import torch
import requests
from tempfile import NamedTemporaryFile
from uuid import uuid4
from glob import glob

torch.hub._validate_not_a_forked_repo = lambda a, b, c: True


def expect_image(image: str):
    """get bounding boxes"""
    model = torch.hub.load('ultralytics/yolov5',
                           'custom', path='inference/lib/mushroomAI.pt')

    results = model(image)

    results.print()

    uid = str(uuid4())
    path = f'./runs/{uid}'

    results.save(path)

    path = glob(path + '/*')[0]

    return [results.pandas().xyxy[0].values.tolist(), path]
