sudo firewall-cmd --permanent --direct --add-rule ipv4 filter FORWARD 1 -s 10.61.0.0/16 -d 10.61.0.0/16 -m state --state NEW -j ACCEPT
sudo firewall-cmd --reload
