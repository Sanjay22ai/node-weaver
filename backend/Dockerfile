# Use an official lightweight Python image
FROM python:3.12-slim
# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file first to leverage Docker caching
COPY requirements.txt .

# Install dependencies cleanly without saving cache to save space
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your backend source code into the container
COPY . .

# Expose port 8000 (the standard port for FastAPI)
EXPOSE 8000

# Run the FastAPI server bound to all interfaces on port 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]