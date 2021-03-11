const Event = require('../app/Event');
const EventForPay = require('../app/EventForPay');

beforeAll(async () => {
});
describe('test one -> the event starts during the day ends during the day.', () => {

    let event;

    let startDate = new Date('2021-01-12T18:30:00');
    let endDate = new Date('2021-01-12T20:10:00');

    beforeEach(async () => {
        event = new Event(startDate, endDate);
    })

    test('the event starts during the day ends during the day.', async () => {
        
        console.log(event.event_for_pay.getEvents().length);
        expect(event.event_for_pay.getEvents().length).toStrictEqual(1);
        expect(event.event_for_pay.getEvents()[0]).toStrictEqual({startDate:startDate,endDate:endDate});
        expect(event.event_for_pay.getEvents()[0].startDate.getHours() >= 6).toStrictEqual(true);
        expect(event.event_for_pay.getEvents()[0].endDate.getHours() <= 22).toStrictEqual(true);
    });
});
describe('test two -> the event starts during the night ends during the night.', () => {

    let event;

    let startDate = new Date('2021-01-12T23:30:00');
    let endDate = new Date('2021-01-13T04:10:00');

    beforeEach(async () => {
        event = new Event(startDate, endDate);
    })

    test('the event starts during the night ends during the night.', async () => {
        
        expect(event.event_for_pay.getEvents().length).toStrictEqual(1);
        expect(event.event_for_pay.getEvents()[0]).toStrictEqual({startDate:startDate,endDate:endDate});

        expect(event.event_for_pay.getEvents()[0].startDate.getHours() >= 22).toBe(true);
        //expect(event.event_for_pay.getEvents()[0].endDate.getHours() <= 06 || event.event_for_pay.getEvents()[0].endDate.getHours() >= 22).toBe(true);

    });
});
describe('test three -> the event starts day ends during the night.', () => {

    let event;

    let startDate = new Date('2021-01-12T18:30:00');
    let endDate = new Date('2021-01-13T03:10:00');

    beforeEach(async () => {
        event = new Event(startDate, endDate);
    })

    test('the event starts day ends during the night.', async () => {

        let date215959H = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        date215959H.setHours(21);
        date215959H.setMinutes(59);
        date215959H.setSeconds(59);
        let date22H = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        date22H.setHours(22);

        expect(event.event_for_pay.getEvents().length).toStrictEqual(2);
        expect(event.event_for_pay.getEvents()[0]).toStrictEqual({startDate:startDate,endDate:date215959H});
        expect(event.event_for_pay.getEvents()[1]).toStrictEqual({startDate:date22H,endDate:endDate});
        

    });
});
describe('test four -> the event starts during the night ends during the day.', () => {

    let event;

    let startDate = new Date('2021-01-13T03:30:00');
    let endDate = new Date('2021-01-13T15:10:00');

    beforeEach(async () => {
        event = new Event(startDate, endDate);
    })

    test('the event starts during the night ends during the day.', async () => {

        let date55959H = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        date55959H.setHours(5);
        date55959H.setMinutes(59);
        date55959H.setSeconds(59);
        let date6H = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        date6H.setHours(6);
        
        expect(event.event_for_pay.getEvents().length).toStrictEqual(2);
        expect(event.event_for_pay.getEvents()[0]).toStrictEqual({startDate:startDate,endDate:date55959H});
        expect(event.event_for_pay.getEvents()[1]).toStrictEqual({startDate:date6H,endDate:endDate});

    });
});
describe('test five -> the event starts during the day, continues during the night and ends during the day', () => {

    let event;

    let startDate = new Date('2021-01-12T15:30:00');
    let endDate = new Date('2021-01-13T16:10:00');

    beforeEach(async () => {
        event = new Event(startDate, endDate);
    })

    test('the event starts during the day, continues during the night and ends during the day', async () => {

        let date215959H = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        date215959H.setHours(21);
        date215959H.setMinutes(59);
        date215959H.setSeconds(59);
        let date22H = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        date22H.setHours(22);

        let date55959H = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
        date55959H.setHours(5);
        date55959H.setMinutes(59);
        date55959H.setSeconds(59);
        let date6H = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
        date6H.setHours(6);
        
        expect(event.event_for_pay.getEvents().length).toStrictEqual(3);
        expect(event.event_for_pay.getEvents()[0]).toStrictEqual({startDate:startDate,endDate:date215959H});
        expect(event.event_for_pay.getEvents()[1]).toStrictEqual({startDate:date22H,endDate:date55959H});
        expect(event.event_for_pay.getEvents()[2]).toStrictEqual({startDate:date6H,endDate:endDate});

    });
});