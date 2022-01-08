SCRIPTS=$(pwd)
BACKEND=$(cd ../backend ; pwd)

docker-compose run --rm --name backend_test --volume=$SCRIPTS:/scripts --volume=$BACKEND:/backend --entrypoint="/bin/bash -c 'sleep 2s ; bash /scripts/run-test-python.sh'" backend