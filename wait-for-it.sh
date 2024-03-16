#!/bin/sh

# Wait for a given TCP address and port to become available

host="$1"
port="$2"

shift 2

until nc -z "$host" "$port"; do
  >&2 echo "Wait for api: $host:$port is unavailable - sleeping"
  sleep 10
done

>&2 echo "Wait for api: $host:$port is available"

exec "$@"