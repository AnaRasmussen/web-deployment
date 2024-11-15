# Use the official Nginx image as the base
FROM nginx:latest

# Copy your static files into the Nginx container
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
