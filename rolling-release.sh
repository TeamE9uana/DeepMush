#!/bin/bash

cd k8s
kubectl rollout restart backend filebeat migrate worker