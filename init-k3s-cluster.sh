./install-cert-manager.sh
kubectl apply -f ./k8s/auth
kubectl apply -f ./k8s/ingress
kubectl apply -f ./k8s/secrets
kubectl apply -f ./k8s