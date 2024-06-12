import { expect } from 'chai';
import sinon from 'sinon';
import createPushNotificationJobs from './8-job';

describe('createPushNotificationJobs', () => {
    let queueMock;

    beforeEach(() => {
        // Create a mock for the Kue queue
        queueMock = {
            create: sinon.stub().returnsThis(),
            save: sinon.stub(),
            on: sinon.stub()
        };
    });

    it('should throw an error if jobs is not an array', () => {
        expect(() => createPushNotificationJobs({}, queueMock)).to.throw('Jobs is not an array');
    });

    it('should create jobs for each item in the array', () => {
        const jobs = [{}, {}, {}];
        createPushNotificationJobs(jobs, queueMock);
        
        expect(queueMock.create.callCount).to.equal(3);
        expect(queueMock.save.callCount).to.equal(3);
        expect(queueMock.on.callCount).to.equal(9); // 3 complete, 3 failed, 3 progress
    });

    it('should log job creation messages when jobs are saved successfully', () => {
        const jobs = [{}, {}];
        createPushNotificationJobs(jobs, queueMock);
        
        // Check if log messages are called for each job
        expect(console.log.callCount).to.equal(2); // Two log messages for two jobs created
    });
});
