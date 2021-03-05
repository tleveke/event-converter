const EventForPay = require("./EventForPay")

class Event {
    
    constructor(start,end) {
        this.startDate = start;
        this.endDate = end; 
        console.log('qdsdqsqdssdq');
        this.event_for_pay = new EventForPay(this);
        //this.event_for_pay.push(this);
    }

} 
module.exports = Event