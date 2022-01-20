terraform {
  required_providers {
    vultr = {
      source = "vultr/vultr"
      version = "2.8.1"
    }
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

# Configure the Vultr Provider
provider "vultr" {
  api_key = var.VULTR_API_KEY
}

# Configure the AWS Provider
provider "aws" {
  region = "ap-northeast-2"
}

data "local_file" "vultr_pub" {
  filename = pathexpand("~/.ssh/vultr.pub")
}

resource "vultr_ssh_key" "k3s_ssh_key" {
  name = "k3s_ssh_key"
  ssh_key = data.local_file.vultr_pub.content
}

# Create a web instance
resource "vultr_instance" "k3s" {
    plan = "vc2-8c-32gb"
    region = "icn" # Korea region
    os_id = "387" # ubuntu 20.04 x64
    ssh_key_ids = [vultr_ssh_key.k3s_ssh_key.id]
}

resource "null_resource" "ansible_exec" {
    depends_on = [vultr_instance.k3s]
    provisioner "local-exec" {
        command = <<EOF
            echo "[deepmush]" > inventory
            echo "${vultr_instance.k3s.main_ip} ansible_ssh_user=root ansible_ssh_private_key_file=~/.ssh/vultr" >> inventory
        EOF
    }


    provisioner "local-exec" {
        command = <<EOT
            sleep 120s
            ANSIBLE_HOST_KEY_CHECKING=False
            ansible-playbook -T 9999 -i inventory setup.yaml
        EOT
    }
}

resource "null_resource" "k3s_launch" {
    depends_on = [null_resource.ansible_exec]
    provisioner "local-exec" {
        command = <<EOT
            KUBECONFIG=$(pwd)/k3s.yaml:$KUBECONFIG
            kubectl config set-context deepmush-k3s
            cd ..
            ./init-k3s-cluster.sh
        EOT
    }
}

resource "aws_route53_record" "root" {
    depends_on = [null_resource.k3s_launch]

    allow_overwrite = true
    zone_id = "Z034625926P0HUTT0YKW7"
    name    = "deepmush.io"
    type    = "A"
    ttl     = "60"
    records = [vultr_instance.k3s.main_ip]
}

resource "aws_route53_record" "sub" {
    depends_on = [null_resource.k3s_launch]

    allow_overwrite = true
    zone_id = "Z034625926P0HUTT0YKW7"
    name    = "*.deepmush.io"
    type    = "A"
    ttl     = "60"
    records = [vultr_instance.k3s.main_ip]
}