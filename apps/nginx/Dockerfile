ARG NGINX_VERSION

FROM ${NGINX_VERSION} as servestage
ENV PROJECT_DIR ./apps/nginx

RUN rm /etc/nginx/conf.d/default.conf
COPY ${PROJECT_DIR}/templates  /etc/nginx/templates
