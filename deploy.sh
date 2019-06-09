#!/bin/bash

yarn prod
rsync -rv build/ root@eki.one:/var/www/html/eki.one/rpg/
