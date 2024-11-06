import { Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import {
  ContainerImage,
  FargateTaskDefinition,
  LogDrivers,
} from 'aws-cdk-lib/aws-ecs'
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs'

export class EcsRunTaskDemoStack extends Stack {
  public readonly id: string

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)
    this.id = id

    this.buildTaskDefinition()
  }

  private buildTaskDefinition() {
    const taskId = `${this.id}-Task`
    const taskDefition = new FargateTaskDefinition(this, taskId, {
      family: taskId,
    })

    taskDefition.addContainer(`${this.id}-Container`, {
      image: ContainerImage.fromRegistry('hello-world'),
      logging: LogDrivers.awsLogs({
        streamPrefix: `${this.id}-LogStream`,
        logGroup: new LogGroup(this, `${this.id}-logs`, {
          logGroupName: `${this.id}-logs`,
          retention: RetentionDays.ONE_WEEK,
        }),
      }),
      memoryLimitMiB: 512,
      cpu: 256,
    })
  }
}
