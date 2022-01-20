BACKEND=$(cd .. ; pwd)

docker-compose run --rm --name backend_test --volume=$BACKEND:/backend -e IS_TEST="1" --entrypoint="/bin/bash /backend/scripts/run-test-python.sh" backend