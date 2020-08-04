const queue = require('../config/kue');
const commmentsMailer = require('../mailers/comments_mailer');

/* 

every worker has a process function which tells the worker 
that whenver a new task is added to the kue you need to run the process

 */

              /* ↓ type of queue */
queue.process('emails', function(job, done){ //job contains the data 
    console.log('Great! Mails-worker is working fine. This is the data: ', job.data);
    commmentsMailer.newComment(job.data);
    done();
});

/* Run this command for Kue GUI: node node_modules/kue/bin/kue-dashboard */ 