#!/bin/bash

while :; do
    sudo iptables -I INPUT 1 -i cni0 -s 10.42.0.0/16 -j ACCEPT ;
    sudo iptables -I FORWARD 1 -s 10.42.0.0/15 -j ACCEPT ;

    sleep 1s ;
done