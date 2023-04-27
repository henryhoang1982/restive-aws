// aws-ec2.test.ts
import { createEC2Instance, queryEC2Instances } from "../src/aws-ec2";
import AWS from "aws-sdk";

describe("Unit tests for createEC2Instance", () => {
    // Mock ec2
    const ec2 = new AWS.EC2();

    // Mock params
    const params = {
        ImageId: "ami-0c3fd0f5d33134a76",
        InstanceType: "t2.micro",
        MaxCount: 1,
        MinCount: 1,
        TagSpecifications: [
            {
                ResourceType: "instance",
                Tags: [
                    {
                        Key: "Name",
                        Value: "test-ec2"
                    }
                ]
            }
        ]
    };

    // Spy on ec2.runInstances and mock return value
    ec2.runInstances = jest.fn().mockReturnValue({
        promise: jest.fn().mockResolvedValue({
            Instances: [
                {
                    InstanceId: "test-instance-id"
                }
            ]
        })
    });

    // should call ec2.runInstances
    it("should call ec2.runInstances", () => {
        createEC2Instance(ec2, params);
        expect(ec2.runInstances).toHaveBeenCalled();
    });

    // should call ec2.runInstances with params
    it("should call ec2.runInstances with params", () => {
        createEC2Instance(ec2, params);
        expect(ec2.runInstances).toHaveBeenCalledWith(params);
    });
});