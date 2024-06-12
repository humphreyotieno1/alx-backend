export default function createPushNotificationJobs(jobs, queue){
    if (!(Array.isArray(jobs))){
        throw Error('Jobs is not an array');
    }
    jobs.forEach(job => {
        const new_job = queue.create('push_notification_code_3', job).save(err => {
            if (!err) {
                console.log(`Notification job created: ${new_job.id}`);
            }
        });
    
        new_job.on('complete', () => {
            console.log(`Notification job ${new_job.id} completed`);
        });

        new_job.on('failed', (err) => {
            console.log(`Notification job ${new_job.id} failed: ${err}`);
        });

        new_job.on('progress', (progress) => {
            console.log(`Notification job ${new_job.id} ${progress}% complete`)
        });
    });
}
