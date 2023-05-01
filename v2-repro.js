import AWS from 'aws-sdk'
var s3 = new AWS.S3({ region: 'us-east-1' });

const BUCKET = ""
const KEYS = []

for (let i = 1; i < 149; i++) {
	KEYS.push(`jey${i}`)
}

function getObjectSlow(bucket, key) {
    var params = { Bucket: bucket, Key: key };
    return s3.getObject(params).promise();
}

function getObjectsSlow(bucket, keys) {
    return Promise.all(keys.map(key => getObjectSlow(bucket, key)));
}

async function run() {
    const t2 = new Date();
    await getObjectsSlow(BUCKET, KEYS, s3);
    console.log('took2:', new Date().valueOf() - t2.valueOf()); // 6200
}
run()