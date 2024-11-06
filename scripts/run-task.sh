#!/bin/bash

# Get the default VPC ID
vpc_id=$(aws ec2 describe-vpcs --filters "Name=isDefault,Values=true" --query "Vpcs[0].VpcId" --output text)

# Get the subnets from the default VPC
subnets=$(aws ec2 describe-subnets --filters "Name=vpc-id,Values=$vpc_id" --query "Subnets[*].SubnetId" --output text | tr '\t' ',' | sed 's/,$//')

# Get the security groups from the default VPC
security_groups=$(aws ec2 describe-security-groups --filters "Name=vpc-id,Values=$vpc_id" --query "SecurityGroups[*].GroupId" --output text | tr '\n' ',' | sed 's/,$//')

# Run the ECS task with the network configuration
aws ecs run-task \
  --cluster default \
  --task-definition EcsRunTaskDemoStack-Task \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[$subnets],securityGroups=[$security_groups],assignPublicIp=ENABLED}"
