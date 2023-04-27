import figlet from "figlet";
import { Command } from "commander";
import { configureAWS } from "./aws-config";
import { createEC2Instance } from "./aws-ec2";
import AWS from "aws-sdk";

// Initialize program
const program = new Command();

console.log(figlet.textSync("RESTIVE CLI"));

// Define a default program
program
    .version("0.0.1")
    .description("A CLI for RESTive")
    .option("-k, --key <value>", "AWS Access Key ID")
    .option("-s, --secret <value>", "AWS Secret Access Key")
    .option("-e, --ec2 <value>", "Create an EC2 instance")
    .option("-t, --tags <value>", "verifies the tags of the EC2 instances")
    .parse(process.argv);

// Save options
const options = program.opts();

// Check if options are provided
if (!options.key || !options.secret) {
    console.error("Please provide AWS Access Key ID and AWS Secret Access Key");
    process.exit(1);
} else {
    // Calling configureAWS from aws-config.ts with options
    configureAWS(options);

    // Check if EC2 option is provided
    const ec2Name = options.ec2;
    if (ec2Name) {
        console.log(`EC2 name is provided ${ec2Name}`);

        // Create a free tier EC2 instance with Amazon Linux 2 AMI and name it as ec2Name
        // Calling createEC2Instance from aws-ec2.ts with options
        createEC2Instance(new AWS.EC2({region: 'ap-southeast-2'}), {
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
    } else if (options.tags) {
        
    } else {
        console.error("Please provide valid options or use --help");
        process.exit(1);
    }
}