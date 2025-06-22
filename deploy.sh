#!/bin/bash

cd /var/www/webroot/omnisell || exit
git pull origin main
sudo nginx -t
sudo systemctl reload nginx