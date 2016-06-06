FROM nginx

COPY default.conf /etc/nginx/conf.d/default.conf
COPY staging.htpasswd /usr/share/nginx/staging.htpasswd
VOLUME /usr/src/app/public
