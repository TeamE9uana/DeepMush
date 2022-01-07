from .lib.detection_raw import run as run_yolov5, ROOT
from config.celery import app


@app.task
def run_inference(**kwargs) -> None:
    """celery task function of yolov5.

    Args:
        kwargs: optional parameters of run.
            source:          file/dir/URL/glob, 0 for webcam
            data:            dataset.yaml path
            conf_thres:      confidence threshold
            iou_thres:       NMS IOU threshold
            max_det:         maximum detections per image
            device:          cuda device, i.e. 0 or 0,1,2,3 or cpu
            view_img:        show results
            save_txt:        save results to *.txt
            save_conf:       save confidences in --save-txt labels
            save_crop:       save cropped prediction boxes
            nosave:          do not save images/videos
            classes:         filter by class: --class 0, or --class 0 2 3
            agnostic_nms:    class-agnostic NMS
            augment:         augmented inference
            visualize:       visualize features
            update:          update all models
            project:         save results to project/name
            name:            save results to project/name
            exist_ok:        existing project/name ok, do not increment
            line_thickness:  bounding box thickness (pixels)
            hide_labels:     hide labels
            hide_conf:       hide confidences
            half:            use FP16 half-precision inference
            dnn:             use OpenCV DNN for ONNX inference

    Returns:
        None. makes image file as side effect.

    Fixed Parameters: couldn't be overrided.
        weights = ./lib/mushroomAI.pt:    model.pt path(s)
        imgsz = (416, 416):           inference size (height, width)
    """

    arguments = kwargs | {'weights': ROOT /
                          'lib/mushroomAI.pt', 'imgsz': (416, 416)}

    run_yolov5(**arguments)
