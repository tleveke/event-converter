const Event = require('../app/Event');
const EventForPay = require('../app/EventForPay');

beforeAll(async () => {
});
describe('test one -> the event starts during the day ends during the day.', () => {

    let event;

    let startDate = new Date('2021-01-11T18:30:00');
/*
    23->06 => 1 paie

    01-12
    06->22 => 28 paie
    22->06 => 28 paie
    02-10 

    06-22 => 1 paie
    22-04 => 1 paie
*/
    let endDate = new Date('2021-01-20T23:10:00');

    beforeEach(async () => {
        event = new Event(startDate, endDate);
    })

    test('the event starts during the day ends during the day.', async () => {

        console.log(event);
        console.log(event.event_for_pay.getEventsBeautiful());
        console.log(event.event_for_pay.getEvents().length);
        expect(event.event_for_pay.getEvents()[0].startDate).toStrictEqual(startDate);
    });
});