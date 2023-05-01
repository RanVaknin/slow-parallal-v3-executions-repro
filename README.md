# slow-parallal-v3-executions-repro
Reproduction for https://github.com/aws/aws-sdk-js-v3/issues/3560

### how to repro:
1. clone the repo
2. run npm install
3. edit and run `node setup.js` to upload sample object to bucket
4. run `node v2-repro.js`
5. run `node v3-repro.js`
6. uncomment the code in v3-repro and witness difference in performance.

