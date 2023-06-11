FROM php:7.4-apache

RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libpq-dev \
    libzip-dev \
    unzip \
    && docker-php-ext-configure gd --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd mysqli pdo_mysql pdo_pgsql zip


COPY docker-entrypoint.sh /usr/local/bin/dockerInit

RUN chmod +x /usr/local/bin/dockerInit
RUN dockerInit

COPY . /var/www/html/