
[한국어](README.md) | [English]

<br>

# **🍄 DeepMush**


- Platform for classifying and saving locations of mushrooms

App Flow Model


<p>
 <img width="700" alt="quizmaker_imageupload" src="https://user-images.githubusercontent.com/52617204/151109579-f6ca7c75-5087-4a31-a5eb-54c0ae9a41dd.png">
 </p>
<br>

# Core Screen
<br>
1.Social Login
<br>
2.User Information
<br>
3.Mushroom List
<br>
4.Camera Interface/AI Classification
<br>
5.Mushroom Location Data
<br>
<br>


Social Login and User Information
<br>


<p>
 <img width="250" height="545" alt="quizmaker_imageupload" src="https://user-images.githubusercontent.com/52617204/151115193-8e563f83-16b2-43c1-935a-64ec89686472.gif">
 &nbsp;&nbsp;&nbsp;&nbsp;
 <img width="250" height="545" alt="quizmaker_imageupload" src="https://user-images.githubusercontent.com/52617204/151109628-e3a1cfd3-f1ff-4d72-befc-e3c288eb43c7.gif">
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img width="250" height="545" alt="quizmaker_imageupload" src="https://user-images.githubusercontent.com/52617204/151110509-2e1281f3-a90f-415f-8fc2-f677c9f2ae03.png">
</p>
<br>

Mushroom List(Search/Delete/Details)
<p>
 <img width="250" height="545" alt="quizmaker_imageupload" src="https://user-images.githubusercontent.com/52617204/151110573-e3f309ff-6063-42d1-bee7-64d1f512db69.gif">
  &nbsp;&nbsp;&nbsp;&nbsp;
 <img width="250" height="545" alt="quizmaker_imageupload" src="https://user-images.githubusercontent.com/52617204/151110584-db5a721b-f70b-4326-a95e-c45804ab4b24.gif">
  &nbsp;&nbsp;&nbsp;&nbsp;
 <img width="250" height="545" alt="quizmaker_imageupload" src="https://user-images.githubusercontent.com/52617204/151110593-fb0a4212-e337-4c9e-a703-675754215176.gif">
</p>
<br>

Camera Interface/AI Classification(Album Upload,Camera Upload,empty)


<p>
 <img width="250" height="545" alt="quizmaker_imageupload" src="https://user-images.githubusercontent.com/52617204/151110697-d593fede-1580-478a-8827-fa97f24775b8.gif">
  &nbsp;&nbsp;&nbsp;&nbsp;
 <img width="250" height="545" alt="quizmaker_imageupload" src="https://user-images.githubusercontent.com/52617204/151110761-78cc3c25-96be-4e67-8c80-2f03374045ab.gif">
  &nbsp;&nbsp;&nbsp;&nbsp;
 <img width="250" height="545" alt="quizmaker_imageupload" src="https://user-images.githubusercontent.com/52617204/151110769-f315050e-10d4-4e12-83c0-c3efb749a19b.gif">
</p>
<br>


Mushroom Location Data

<p>
 <img width="250" height="545" alt="quizmaker_imageupload" src="https://user-images.githubusercontent.com/52617204/151110793-70e0f4fe-05bd-4232-b1b6-16ccad3acad3.gif">
</p>
<br>


## **🏢 System Architecture**


<p align="center">  
  <img src="https://user-images.githubusercontent.com/52617204/151111902-89b73655-e0ad-4c04-a604-5900086daf35.png">
</p>

<br>




## **📑 Swagger**

<p align="center">
<img alt="swagger" src="https://user-images.githubusercontent.com/52617204/151116968-91daa564-0b19-4fd6-894e-939737c26150.png">
</p>

<br>

## **🤖 AI**
 
<img alt="swagger" src="https://user-images.githubusercontent.com/52617204/151129010-5bb17820-b6f5-4b5c-8ab3-2073dcdb0642.png">
<img alt="swagger" src="https://user-images.githubusercontent.com/52617204/151129058-aaf95002-6958-48dc-829c-95ac43d61dad.png">
<img alt="swagger" src="https://user-images.githubusercontent.com/52617204/151129108-81efb7aa-c483-48aa-a508-50874d589528.png">
<br>

<br>

# **🏃‍♂️ How to Start**

<br>
# cd frontend
<br>
# npm install
<br>
# expo start
<br>
<br>
<br>
<br>
<br>

# Directory tree

```
.
├── LICENSE
├── README.md
├── backend
│   ├── Dockerfile
│   ├── README.md
│   ├── accounts
│   ├── config
│   ├── db
│   ├── images
│   ├── inference
│   ├── latlngs
│   ├── logs
│   ├── manage.py
│   ├── registry.py
│   ├── requirements.txt
│   ├── run-celery.sh
│   ├── run.sh
│   ├── scripts
│   ├── secrets.json
│   ├── secrets.template.json
│   ├── static-files
│   └── users
├── build-images.sh
├── data
│   ├── elk-data
│   ├── grafana
│   └── prometheus
├── db
├── deploy
│   ├── 502saver.service
│   ├── 502saver.sh
│   ├── setup.tf
│   ├── setup.yaml
│   └── variables.tf
├── docker-compose.yml
├── elastic
│   ├── elasticsearch.prod.yml
│   └── elasticsearch.yml
├── filebeat
│   ├── filebeat.prod.yml
│   └── filebeat.yml
├── frontend
│   ├── App.tsx
│   ├── app.json
│   ├── assets
│   ├── babel.config.js
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
│   ├── shim.js
│   └── src
│   │   ├── Components
│   │   │   ├── BorderLineComponent.tsx //line component 
│   │   │   ├── ListBodyComponent.tsx //mushromm list body component
│   │   │   ├── ListFooterComponent.tsx // mushroom list foot component
│   │   │   ├── ListPageHeaderComponent.tsx // mushroon list header component
│   │   │   ├── SearchBarComponent.tsx //searchbar component
│   │   │   └── functionComponent.tsx //empty mushroom detect and expolocation function component
│   │   ├── MainContainer.tsx
│   │   ├── Screens
│   │   │   ├── DetailMapPage.tsx //detail mushroom location page
│   │   │   ├── DetailPage.tsx //detail mushroom info page
│   │   │   ├── ExpoCameraPage.tsx //camera and image to server api 
│   │   │   ├── ListPage.tsx //mushroom list page
│   │   │   ├── LoginPage.tsx //google login and kakao login
│   │   │   ├── MapPage.tsx //all mushroom's location 
│   │   │   ├── UserInfoPage.tsx //user info page 
│   │   │   └── WebSee.tsx //webview page for social login
│   ├── tsconfig.json
│   ├── yarn-error.log
│   └── yarn.lock
├── grafana
│   ├── grafana.ini
│   └── grafana.prod.ini
├── init-k3s-cluster.sh
├── install-cert-manager.sh
├── k8s
├── logstash
│   └── input.local.conf
├── mongo-db
├── nginx
│   ├── config
│   └── logs
├── production
├── prometheus
├── push-images.sh
├── rolling-release.sh
├── uninstall-cert-manager.sh
└── up-pods.sh
```






## ** 👨‍👨‍👧‍👦 Members**

| Name       | Development Area                          | About                                         | 
| ---------- | ---------------------------------- |  -------------------------------------------------- |
|김민웅 Kevin Kim   | Front-end                          |  [Github Profile](https://github.com/POL6463)  |
|김준형  JunHyeong Kim | Front-end                          |                      [Github Profile](https://github.com/junhyeongkim2)   |
|이지호  Jiho Lee | Back-end                           |                   [Github Profile](https://github.com/DPS0340)   |
|최우석  WooSeok Choe | Back-end                           |                   [Github Profile](https://github.com/wsChoe123) |
|Ryan Lee | Deep learning                      |                                 [Github Profile](https://github.com/printSANO)   |
