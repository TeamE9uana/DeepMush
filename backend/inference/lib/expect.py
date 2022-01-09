from io import BytesIO
import numpy as np
from PIL import Image as PILImage
import torch
import requests
from tempfile import NamedTemporaryFile
from uuid import uuid4

torch.hub._validate_not_a_forked_repo = lambda a, b, c: True


def expect_image(image: str):
    """get bounding boxes"""
    res = requests.get(image)

    image_file = BytesIO(res.content)

    temp_file = NamedTemporaryFile()
    temp_file.write(image_file.read())

    image_rgb = PILImage.open(temp_file.name).convert('RGB')
    np_image = np.array(image_rgb)

    model = torch.hub.load('ultralytics/yolov5',
                           'custom', path='inference/lib/mushroomAI.pt', force_reload=True)

    results = model([np_image.copy()])

    results.print()

    uid = str(uuid4())
    path = f'./runs/{uid}'

    results.save(path)

    path += '/image0.jpg'

    return [results.pandas().xyxy[0].values.tolist(), path]
