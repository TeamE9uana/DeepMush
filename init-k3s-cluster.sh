kubectl apply -f https://raw.githubusercontent.com/rancher/local-path-provisioner/master/deploy/local-path-storage.yaml
./install-cert-manager.sh
kubectl apply -f ./k8s/local-path-provisioner
kubectl apply -f ./k8s/volumes
kubectl apply -f ./k8s/auth
kubectl apply -f ./k8s/ingress
kubectl apply -f ./k8s/secrets
kubectl apply -f ./k8s