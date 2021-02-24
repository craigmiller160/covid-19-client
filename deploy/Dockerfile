FROM craigmiller160.ddns.net:30004/nginx-base:1.1.0

COPY build/covid-19-client-*.tgz /var/www/covid-19-client.tgz
RUN tar xvf /var/www/covid-19-client.tgz -C /var/www/
RUN rm /var/www/covid-19-client.tgz
RUN cp -R /var/www/package/build/* /var/www/
RUN rm -rf /var/www/package
RUN cp /var/www/nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["nginx","-g","daemon off;"]