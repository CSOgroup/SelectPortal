#####
#Author: Arvind Iyer
#Email: ayalurarvind@gmail.com
#Desc: Main app file
#Version: 0.0.1
####
# Dockerfile-backend
# Use python3 image
FROM python:3.8-slim
RUN apt-get update \
&& apt-get install gcc -y \
&& apt-get clean
# Set an environment variable with the directory
# where we'll be running the app
ENV APP /backend
# Create the directory and instruct Docker to operate
# from there from now on
RUN mkdir $APP
WORKDIR $APP
# Expose the port uWSGI will listen on
EXPOSE 5000
# Copy the requirements file in order to install
# Python dependencies
COPY requirements.txt .
# Install Python dependencies
RUN pip install -r requirements.txt
# We copy the rest of the codebase into the image
COPY . .
# Run the python server
CMD ["python3","server/main.py"]