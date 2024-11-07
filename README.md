# ecs-run-task-demo

There's a [companion blog post](https://danielleheberling.xyz/blog/ecs-run-task/) that goes along with this repo in case you haven't seen it yet.

This repo contains sample code to spin up an ECS Fargate task definition that can run on-demand via [ECS run-task](https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_RunTask.html).

Once the container is finished running the code, it will spin back down to zero.

This is great for when you have ad-hoc jobs that need to be run on demand for billing reasons and they will run for longer than the Lambda max timeout.

This example repo shows how to run the deployed task via the AWS CLI; however, you can invoke `ecs run-task` in different ways if you prefer such as the AWS Console, EventBridge etc.

The sample script runs the task in the AWS account's default ECS cluster, but you can change the script to have it run in a different cluster.

You will also likely want to change the container image to yours since this example pulls the "hello world" image from DockerHub.

## Quickstart

### Prerequisites

1. Install [node.js and npm](https://nodejs.org/en). See `.nvmrc` for the recommended version.
2. Ensure you have an AWS account, install the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html), and [configure your credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html)

### Steps

1. Clone the repo
2. `npm install`
3. `npm run deploy` to deploy to your AWS account
4. `./scripts/run-task.sh` once deployed to run the task on demand
5. View logs of task run in the `EcsRunTaskDemoStack-logs` [Amazon CloudWatch](https://aws.amazon.com/cloudwatch/) log group to ensure it ran

## Cleanup

To delete the resources created by this project, run `npm run destroy`.
