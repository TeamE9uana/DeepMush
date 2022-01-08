BACKEND=$(cd .. ; pwd)

docker-compose run --rm --name backend_test --volume=$BACKEND:/backend --entrypoint="/bin/bash /backend/scripts/run-test-python.sh" backend