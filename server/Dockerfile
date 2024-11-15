FROM python:3.9-slim

# Install build dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    libsqlite3-dev \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements.txt file and install Python dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy the server folder (backend code) into the container
COPY . .

# Expose the port that server.py uses (8080 in this case)
EXPOSE 8080

# Run the server directly using python3
CMD ["python3", "server.py"]

