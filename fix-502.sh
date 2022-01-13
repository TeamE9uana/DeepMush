sudo firewall-cmd --permanent --zone=public --add-rich-rule="rule family=ipv4 source address=10.61.10.0/16 accept"
sudo firewall-cmd --reload
