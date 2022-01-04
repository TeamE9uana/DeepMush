#!/bin/bash

sudo chmod -R 700 /var/lib/postgresql/data
sudo chown -R $(whoami) /var/lib/postgresql/data
postgres