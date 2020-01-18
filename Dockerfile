FROM python:3.8.0

WORKDIR /app
COPY docker-requirements.txt ./
RUN pip install -r docker-requirements.txt
COPY . .
