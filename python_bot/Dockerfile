FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy bot files
COPY . .

# Run tests during build
RUN python test_engine.py

# Default entrypoint (Runs both Web Port Listener and Telegram Bot concurrently)
CMD ["python", "main.py"]
