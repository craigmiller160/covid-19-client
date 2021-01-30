FROM craigmiller160.ddns.net:30004/nginx-base:1.1.0

RUN apt-get update && apt-get install unzip

COPY build/covid-19-client-*.zip /var/www/covid-19-client.zip
RUN unzip /var/www/covid-19-client.zip -d /var/www/
RUN rm /var/www/covid-19-client.zip
RUN cp /var/www/nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["nginx","-g","daemon off;"]