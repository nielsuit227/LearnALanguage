# Get Image
FROM python:3.10

WORKDIR /app

# Won't write .pyc & outputs in container
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV DB_HOST postgres

# Install libmagic
RUN apt-get update && apt-get install -y --no-install-recommends libmagic1

# Install dependencies
ADD requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy files (static ignored in .dockerignore)
COPY . .

# Give execute permission to entrypoint.sh
RUN chmod +x entrypoint.sh

# Entrypoint
ENTRYPOINT ["bash", "/app/entrypoint.sh"]