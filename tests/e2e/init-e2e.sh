#!/bin/bash

set -e

until mysql -u wordpress -h db --password="wordpress" -e 'USE wordpress;'; do
	>&2 echo "Waiting for database connection..."
	sleep 1
done

>&2 echo "mysqld is up - configuring wp install"

wp core install --url="http://localhost:8889" --title="wp-parsely e2e test" --admin_user="wordpress" --admin_password="wordpress" --admin_email="nobody@example.com"
