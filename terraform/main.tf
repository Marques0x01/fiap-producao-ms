provider "aws" {
  region = "us-east-1"
}

data "aws_availability_zones" "available" {}



data "aws_caller_identity" "current" {}

resource "aws_security_group" "rds" {
  name   = "producao_rds"

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "producao_rds"
  }
}


resource "aws_db_instance" "producao-ms-1" {
  identifier          = "producao-ms-1"
  instance_class      = "db.t3.micro"
  allocated_storage   = 5
  engine              = "postgres"
  engine_version      = "16.3"
  username            = "edu"
  password            = "hashicorp"
  publicly_accessible = true
  skip_final_snapshot = true
}
