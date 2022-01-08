from inference.lib.expect import expect_image
from config.celery import app


@app.task(track_started=True)
def expect_image_task(image: str):
    return expect_image(image)
