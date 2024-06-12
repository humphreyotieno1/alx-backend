const kue = require('kue');

const queue = kue.createQueue();

const jobs = [
    {
      phoneNumber: '4153518780',
      message: 'This is the code 1234 to verify your account'
    },
    {
      phoneNumber: '4153518781',
      message: 'This is the code 4562 to verify your account'
    },
    {
      phoneNumber: '4153518743',
      message: 'This is the code 4321 to verify your account'
    },
    {
      phoneNumber: '4153538781',
      message: 'This is the code 4562 to verify your account'
    },
    {
      phoneNumber: '4153118782',
      message: 'This is the code 4321 to verify your account'
    },
    {
      phoneNumber: '4153718781',
      message: 'This is the code 4562 to verify your account'
    },
    {
      phoneNumber: '4159518782',
      message: 'This is the code 4321 to verify your account'
    },
    {
      phoneNumber: '4158718781',
      message: 'This is the code 4562 to verify your account'
    },
    {
      phoneNumber: '4153818782',
      message: 'This is the code 4321 to verify your account'
    },
    {
      phoneNumber: '4154318781',
      message: 'This is the code 4562 to verify your account'
    },
    {
      phoneNumber: '4151218782',
      message: 'This is the code 4321 to verify your account'
    }
  ];
// a loop to create a job for each array element
for (const job of jobs) {
    const created_job = queue.create('push_notification_code_2', job).save((err) => {
        if (!err) {
            console.log(`Notification job created: ${created_job.id}`);
        }
    });

    created_job.on('complete', () => {
        console.log(`Notification job ${created_job.id} completed`);
    });

    created_job.on('failed', (err) => {
        console.log(`Notification job ${created_job.id} failed: ${err}`);
    });

    created_job.on('progress', (progress) => {
        console.log(`Notification job ${created_job.id} ${progress}% complete`);
    });
}
