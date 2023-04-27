// aws-config.test.ts
import { configureAWS } from "../src/aws-config";
import AWS from "aws-sdk";

describe("Unit tests for configureAWS", () => {
    // Mock options
    const options = {
        key: "test-key",
        secret: "test-secret"
    };

    // Mock AWS.config.update
    AWS.config.update = jest.fn();

    // should call AWS.config.update
    it("should call AWS.config.update", () => {
        configureAWS(options);
        expect(AWS.config.update).toHaveBeenCalled();
    });

    // should call AWS.config.update with options
    it("should call AWS.config.update with options", () => {
        configureAWS(options);
        expect(AWS.config.update).toHaveBeenCalledWith({
            region: "ap-southeast-2",
            accessKeyId: options.key,
            secretAccessKey: options.secret
        });
    });

    // should throw an error if AWS.config.update throws an error
    it("should throw an error if AWS.config.update throws an error", () => {
        AWS.config.update = jest.fn(() => {
            throw new Error("AWS Configuration failed");
        });
        expect(() => {
            configureAWS(options);
        }).toThrow("AWS Configuration failed");
    });
});