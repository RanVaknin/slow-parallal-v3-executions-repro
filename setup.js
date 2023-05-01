import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const client = new S3Client({})

const BUCKET = ""

const pushToS3 = async (s3client, bucket, data, key) => {
    try {
        await s3client.send(
            new PutObjectCommand({
                Bucket: bucket,
                Key: key,
                Body: data,
            }),
        );
        console.log("Intermittently never reached!");
    } catch (e) {
        console.log(e.message);
    }
};

for (let i = 0; i < 150; i++) {
    pushToS3(
        client,
        BUCKET,
        `hello-world${Date.now()}`,
        `jey${i}`
    )
}
