import { Command, OptionValues } from "commander";
import { configureAWS } from "./aws-config";
import { createEC2Instance } from "./aws-ec2";
import AWS from "aws-sdk";

export class RestCli {

    // OptionValues property
    public optionValues: OptionValues;

    // Commander program
    private program: Command;

    constructor() {
        // Initialize Command object
        this.program = new Command();

        // Define a default program
        this.program
            .version("0.0.1")
            .description("A CLI for RESTive")
            .option("-k, --key <value>", "AWS Access Key ID")
            .option("-s, --secret <value>", "AWS Secret Access Key")
            .option("-e, --ec2 [value]", "Create an EC2 instance")
            .option("-t, --tags [value]", "verifies the tags of the EC2 instances")
            .parse(process.argv);

        this.optionValues = this.program.opts();
        this.initAWSConfig();
        this.executeCli();
    }

    // Function to initialize AWS configuration
    private initAWSConfig(): void {
        // Check if options are provided
        if (!this.optionValues.key || !this.optionValues.secret) {
            console.error("Please provide AWS Access Key ID and AWS Secret Access Key");
            process.exit(1);
        } else {
            // Calling configureAWS from aws-config.ts with options and catch errors
            try {
                configureAWS({
                    key: this.optionValues.key,
                    secret: this.optionValues.secret
                });
            } catch (error) {
                console.error(error);
                process.exit(1);
            }
        }
    }

    // Function to execute the program
    private executeCli(): void {
        // Check if EC2 option is provided
        const ec2Name = this.optionValues.ec2;
        if (ec2Name) {
            console.log(`EC2 name is provided ${ec2Name}`);
            // Create a free tier EC2 instance with Amazon Linux 2 AMI and name it as ec2Name
            // Calling createEC2Instance from aws-ec2.ts with options
            createEC2Instance(new AWS.EC2({ region: 'ap-southeast-2' }), {
                ImageId: "ami-0f6ad051716c81af1",
                InstanceType: "t2.micro",
                MaxCount: 1,
                MinCount: 1,
                TagSpecifications: [
                    {
                        ResourceType: "instance",
                        Tags: [
                            {
                                Key: "Name",
                                Value: ec2Name
                            }
                        ]
                    }
                ]
            }).then((instance) => {
                console.log("Created instance", instance);
            }).catch((error) => {
                console.error(error);
            });
        }
    }
}