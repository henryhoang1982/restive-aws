# restive-aws

Console utilities for AWS inspection, this is built for Restive folks to learn AWS SDK and copilot experience.

## How to run the cli
`yarn start <options>`

## Options:

* `-V, --version`         output the version number
* `-k, --key <value>`     AWS Access Key ID
* `-s, --secret <value>`  AWS Secret Access Key
* `-e, --ec2 <value>`     Create an EC2 instance
* `-t, --tags [value]`    verifies the tags of the EC2 instances
* `-q, --query`           Query EC2 instances
* `-h, --help`            display help for command

## How to test
* `yarn test` : Running all tests
* `yarn test [prefix_test_file_name | test file name]`: Running a specific test file