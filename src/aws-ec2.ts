import EC2 from "aws-sdk/clients/ec2";

// Function to create an EC2 instance from an AMI
export async function createEC2Instance(
    ec2: AWS.EC2,
    params: EC2.RunInstancesRequest
): Promise<AWS.EC2.Instance> {
    const data = await ec2.runInstances(params).promise();
    if (!data.Instances) {
        throw new Error("No instances created");
    }
    return data.Instances[0];
};

// Function to query EC2 instances
export async function queryEC2Instances(
    ec2: EC2,
    params: EC2.DescribeInstancesRequest
): Promise<EC2.Instance[]> {
    const data = await ec2.describeInstances(params).promise();
    if (!data.Reservations) {
        throw new Error("No instances found");
    }
    return data.Reservations.map((reservation) => {
        if (!reservation.Instances) {
            throw new Error("No instances found");
        }
        return reservation.Instances[0];
    });
}
