import AWS from "aws-sdk";

// Function to configure AWS
export function configureAWS(options: any): void {
    // Configure AWS
    try {
        AWS.config.update({
            region: "ap-southeast-2",
            accessKeyId: options.key,
            secretAccessKey: options.secret
        });
        console.info("AWS Configured");
    } catch (error) {
        throw new Error("AWS Configuration failed");
    }
}