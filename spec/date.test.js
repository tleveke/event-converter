const Event = require('../app/Event');
const EventForPay = require('../app/EventForPay');

beforeAll(async () => {
});

afterAll(async () => {
    // await cleanDb(db)
    // await db.close()
});
// test one -> the event starts during the day ends during the day.
describe('Event', () => {

    let eventsForPay = [];
    let events = [];

    let startDate = new Date('2021-01-10T08:00:00');
    let endDate = new Date('2021-01-10T12:00:00');

    beforeEach(async () => {
        events.push(new Event(startDate,endDate));
        eventsForPay.push(new EventForPay(endDate));
    })

    test('the event starts during the day ends during the day.', async () => {
        const date = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());;
        const dateEnd = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());

        date.setHours(6);
        date.setMinutes(0);
        date.setSeconds(0);

        dateEnd.setHours(21);
        dateEnd.setMinutes(59);
        dateEnd.setSeconds(59);
        
        expect( date.getTime() <= events[0].endDate.getTime() && events[0].endDate.getTime() <= dateEnd.getTime()).toBe(true);
    });
});
// test two -> the event starts during the night ends during the night.
describe('Event', () => {

    let eventsForPay = [];
    let events = [];

    let startDate = new Date('2021-01-10T23:00:00');
    let endDate = new Date('2021-01-11T03:00:00');

    beforeEach(async () => {
        events.push(new Event(startDate,endDate));
        eventsForPay.push(new EventForPay(endDate));
    })

    test('the event starts during the night ends during the night.', async () => {
        expect( events[0].startDate.getHours() => 22 && events[0].endDate.getHours() <= 6).toBe(true);
    });
});
// test three -> the event starts day ends during the night.
describe('Event', () => {

    let eventsForPay = [];
    let events = [];

    let startDate = new Date('2021-01-10T15:00:00');
    let endDate = new Date('2021-01-10T23:00:00');

    beforeEach(async () => {
        events.push(new Event(startDate,endDate));
        eventsForPay.push(new EventForPay(endDate));
    })

    test('the event starts during the night ends during the night.', async () => {

        const dateDay = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        const dateDayEnd = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());

        dateDay.setHours(6);
        dateDay.setMinutes(0);
        dateDay.setSeconds(0);

        dateDayEnd.setHours(21);
        dateDayEnd.setMinutes(59);
        dateDayEnd.setSeconds(59);


        const dateNigth = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        const dateNigthEnd = new Date(startDate.getFullYear(), startDate.getMonth(),1);

        dateNigth.setHours(22);
        dateNigth.setMinutes(0);
        dateNigth.setSeconds(0);

        dateNigthEnd.setDate(dateNigth.getDate()+1)
        
        dateNigthEnd.setHours(5);
        dateNigthEnd.setMinutes(59);
        dateNigthEnd.setSeconds(59);


        expect( events[0].startDate.getTime() => 22 && events[0].endDate.getTime() <= 6).toBe(true);
    });
});