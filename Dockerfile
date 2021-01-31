# Reference: https://typeofnan.dev/how-to-serve-a-react-app-with-nginx-in-docker/

FROM nginx:alpine

# Copy nginx config file
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy already built static assets
COPY build .

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
