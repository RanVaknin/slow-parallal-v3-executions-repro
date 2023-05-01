import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { NodeHttpHandler } from '@aws-sdk/node-http-handler';
import {Agent} from 'node:https';

const BUCKET = "";
const KEYS = [];

for (let i = 1; i < 149; i++) {
	KEYS.push(`jey${i}`)
}

async function getObjectSlow(client, bucket, key) {
	const command = new GetObjectCommand({ Bucket: bucket, Key: key });
	const result = await client.send(command);
	return result;
}

async function getObjectsSlow(client, bucket, keys) { 
	return Promise.all(keys.map(key => getObjectSlow(client, bucket, key)));
}


async function run() {
	const client = new S3Client({ 
		region: 'us-east-1',

        // -->>  uncomment to test workaround:  <<-- 

		// requestHandler: new NodeHttpHandler({
		// 	httpsAgent: new Agent({
		// 	  maxSockets: 500,
		
		// 	  // keepAlive is a default from AWS SDK. We want to preserve this for
		// 	  // performance reasons.
		// 	  keepAlive: true,
		// 	  keepAliveMsecs: 1000,
		// 	}),
		// 	socketTimeout: 5000,
		//   }),
	});

	const t2 = new Date();
	await getObjectsSlow(client, BUCKET, KEYS);
	console.log('took2:', new Date().valueOf() - t2.valueOf()); //6200
}
run();