const kue = require('kue');

const queue = kue.createQueue({
    concurrency: 2
});
const blackListed = [4153518780, 4153518781];

function sendNotification(phoneNumber, message, job, done) {
    if (blackListed.includes(phoneNumber)){
        done(new Error(`Phone number ${phoneNumber} is blacklisted`))
    }
    let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        job.progress(progress, 100);
        if (progress >= 50) {
          clearInterval(interval);
          console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
          job.progress(50, 100);
          done();
        }
      }, 500);
    }
  
  
queue.process('push_notification_code_2', 2, (job, done) => {
    const { phoneNumber, message } = job.data;
    sendNotification(phoneNumber, message, job, done);
  });
  