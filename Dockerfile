FROM nginx:alpine

COPY dist/ecom-ui/browser /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80