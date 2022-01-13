sudo firewall-cmd --direct --permanent --remove-rules ipv4 filter FORWARD
sudo firewall-cmd --direct --permanent --remove-rules ipv4 filter INPUT
sudo firewall-cmd --reload

sudo firewall-cmd --permanent --direct --add-rule ipv4 filter INPUT 1 -i cni0 -s 10.61.0.0/16 -j ACCEPT
sudo firewall-cmd --permanent --direct --add-rule ipv4 filter FORWARD 1 -s 10.61.0.0/15 -j ACCEPT
# sudo firewall-cmd --permanent --direct --add-rule ipv4 filter INPUT 1 -i cni0 -s 10.62.0.0/16 -j ACCEPT
# sudo firewall-cmd --permanent --direct --add-rule ipv4 filter FORWARD 1 -s 10.62.0.0/16 -j ACCEPT
sudo firewall-cmd --reload
