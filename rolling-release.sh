#!/bin/bash

cd k8s
kubectl rollout restart deployment backend filebeat migrate worker