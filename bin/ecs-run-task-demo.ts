#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { EcsRunTaskDemoStack } from '../lib/ecs-run-task-demo-stack'

const {
  CDK_DEFAULT_ACCOUNT,
  CDK_DEFAULT_REGION,
  AWS_DEFAULT_ACCOUNT_ID,
  AWS_DEFAULT_REGION,
} = process.env

const account = CDK_DEFAULT_ACCOUNT || AWS_DEFAULT_ACCOUNT_ID
const region = CDK_DEFAULT_REGION || AWS_DEFAULT_REGION

const app = new cdk.App()

new EcsRunTaskDemoStack(app, 'EcsRunTaskDemoStack', {
  description:
    'This is a stack to demo how to create an ECS task with AWS CDK and run it via the AWS CLI ecs run-task command.',
  env: {
    account,
    region,
  },
})
