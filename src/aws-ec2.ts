
// Function to create an EC2 instance from an AMI
export async function createEC2Instance(
    ec2: AWS.EC2,
    params: AWS.EC2.RunInstancesRequest
): Promise<AWS.EC2.Instance> {
    const data = await ec2.runInstances(params).promise();
    if (!data.Instances) {
        throw new Error("No instances created");
    }
    return data.Instances[0];
};

// Function to create a security group
export async function createSecurityGroup(
    ec2: AWS.EC2,
    params: AWS.EC2.CreateSecurityGroupRequest
): Promise<AWS.EC2.CreateSecurityGroupResult> {
    const data = await ec2.createSecurityGroup(params).promise();
    if (!data) {
        throw new Error("No security group created");
    }
    return data;
};   
