import AWS from "aws-sdk";

// Function to configure AWS
export function configureAWS(options: any): void {
    // Configure AWS
    try {
        if (!options.key && !options.secret) {
            AWS.config.update({
                region: "ap-southeast-2",
                accessKeyId: options.key,
                secretAccessKey: options.secret
            });
        } else {
            console.info("Fetching key and secret from environment variables");
            const awsConfig = new AWS.Config();
            AWS.config.update({
                region: "ap-southeast-2",
                accessKeyId: awsConfig.credentials?.accessKeyId,
                secretAccessKey: awsConfig.credentials?.secretAccessKey
            });
        }
        console.info("AWS Configured");
    } catch (error) {
        throw new Error("AWS Configuration failed");
    }
}