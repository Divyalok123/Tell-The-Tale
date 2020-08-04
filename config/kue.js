const kue = require('kue');
const queue = kue.createQueue();

module.exports = queue;

/*

Queue is basically a group of similar jobs like all emails, otps, notifs etc.
Each worker takes care of each job.

*/

/* Run this comman for Kue GUI: node node_modules/kue/bin/kue-dashboard */