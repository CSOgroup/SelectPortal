#####
#Author: Arvind Iyer
#Email: ayalurarvind@gmail.com
#Desc: Main app file
#Version: 0.0.1
####
# Dockerfile-frontend
# Use nigix server
FROM nginx
EXPOSE 8080
RUN rm /etc/nginx/conf.d/default.conf
COPY nigix.conf /etc/nginx/conf.d
COPY . /usr/share/nginx/html/
