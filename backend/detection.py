import os
import boto3
#from s3 import AWS_SECRET_KEY, AWS_ACCESS_KEY, BUCKET_NAME, APPKEY
import datetime
import re
from pathlib import Path
import cv2
import torch
from models.experimental import attempt_load
from utils.datasets import LoadImages
from utils.general import check_img_size, non_max_suppression, scale_coords, set_logging,save_one_box
from utils.plots import colors, plot_one_box
from utils.torch_utils import select_device


##모델 로드 부분
weights = 'mushroomAI.pt'           # AI 모델 가중치

def get_img(image):

    image_png=image+".jpeg"
    imgsz = 416
    save_dir = Path('result')
    save_crop=True 
    
    # Initialize
    set_logging()
    device = select_device('')
    half = device.type != 'cpu'  # half precision only supported on CUDA

    # Load model
    model = attempt_load(weights, map_location=device)  # load FP32 model

    imgsz = check_img_size(imgsz, s=model.stride.max())  # check img_size

    if half:
        model.half()  # to FP16


    # Set Dataloader
    save_img = True
    source = "./upload/"+image_png #input 이미지 경로
    dataset = LoadImages(source, img_size=imgsz)

    # Get names and colors
    names = model.module.names if hasattr(model, 'module') else model.names

    # return 형식
    dict = {"enoki": [], "shitake" :[], "songi" : [], "yellowegg" : [], "woodear" : [] }

    # Run inference
    if device.type != 'cpu':
        model(torch.zeros(1, 3, imgsz, imgsz).to(device).type_as(next(model.parameters())))  # run once
    for path, img, im0s, vid_cap in dataset:
        img = torch.from_numpy(img).to(device)
        img = img.half() if half else img.float()  # uint8 to fp16/32
        img /= 255.0  # 0 - 255 to 0.0 - 1.0
        if img.ndimension() == 3:
            img = img.unsqueeze(0)

        # Inference
        pred = model(img, augment=False)[0]

        # Apply NMS
        pred = non_max_suppression(pred, 0.5, 0.45, classes=None, agnostic=False)

        # Process detections
        for i, det in enumerate(pred):  # detections per image
            # content안에 객관식 있는 문제의 경우 탐지하기 위해 사용
            isContent = 0
            isQuestion = 0
            isAnswer=0
            p, s, im0, frame = Path(path), '', im0s, getattr(dataset, 'frame', 0)

            save_path = str(save_dir / p.name)
            s += '%gx%g ' % img.shape[2:]  # print string
            gn = torch.tensor(im0.shape)[[1, 0, 1, 0]]  # normalization gain whwh
            imc = im0.copy() if save_crop else im0  # for save_crop
            if len(det):
                # Rescale boxes from img_size to im0 size
                det[:, :4] = scale_coords(img.shape[2:], det[:, :4], im0.shape).round()

                # Print results
                for c in det[:, -1].unique():
                    n = (det[:, -1] == c).sum()  # detections per class
                    s += f"{n} {names[int(c)]}{'s' * (n > 1)}, "  # add to string

                # Write results
                for *xyxy, conf, cls in reversed(det):
                    c = int(cls)  # integer class
                    
                    label =  f'{names[c]} {conf:.2f}'

                    plot_one_box(xyxy, im0, label=label, color=colors(c, True), line_thickness=3)
                    if save_crop:
                        crop_path = save_dir / 'crops' / names[c] / f'{p.stem}.jpg'
                        save_one_box(xyxy, imc, file=crop_path, BGR=True)
                       
                    if names[c] == "content" or names[c] == "question" : # content로 판별시 이미지 여부 판단 모델 들어가지 않고 이미지 자체를 return 데이터에 담음
                        if names[c] == "content": 
                            isContent=1
                        else :
                            isQuestion=1
                        imagefilename ="result/"+ image + "_" + names[c] + "_"+ str(i) + "_" + str(datetime.datetime.now()).replace("\\","/").replace(" ","").replace(":","")+".jpeg"
                        imagefilename.replace(" ","")
                        imagetoupload = open( crop_path , "rb")
                        s3.put_object(Body=imagetoupload, Bucket=BUCKET_NAME, Key=imagefilename, ContentType="image/jpeg")
                        img_url = "https://summer-program.s3.ap-northeast-2.amazonaws.com/"+imagefilename
                        dict[names[c]].append(img_url)

                        text = main(crop_path, APPKEY)
                        text = re.sub(r'[^가-힣a-zA-Zㄱ-ㅎ()0-9.,?![]~%-_/<>\s]:\'\"\+]','', text)
                        if len(text) == 0 or text.isspace():
                            text = "마우스를 올려 이미지로 확인해주세요"
                      
                        dict[names[c]].append(text)
                   
                    
                    
            # Save results (image with detections)
            if save_img:
                if dataset.mode == 'image':
                    cv2.imwrite(save_path, im0)
                   
    # content안에 answer있는 문제의 경우
    print(dict)
    title=dict["question"]
    choices=dict["answer"]
    answer="-"
    script=dict["content"]
    score = "-"       

    return title, choices, answer, script, score
    