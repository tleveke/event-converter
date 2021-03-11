class EventForPay {

    constructor(event) {
        this.events = [];
        console.log
        let startDate = event.startDate;
        let endDate = event.endDate;

        let journeyStart = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startDate.getHours(), startDate.getMinutes(), startDate.getSeconds());
        let journeyEnd = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), endDate.getHours(), endDate.getMinutes(), endDate.getSeconds());

        this.recursiveEvents(journeyStart, journeyEnd);



    }

    recursiveEvents(journeyStart, journeyEnd, index = 0) {
        let a = false;
            if (this.verifSameDay(journeyStart, journeyEnd)) {
                let heuredeFin = journeyEnd.getHours();
                let heuredudebut = journeyStart.getHours();

                if ( (heuredeFin <= 22 && heuredeFin >= 6) && (heuredudebut <= 22 && heuredudebut >= 6)) {
                    console.log("PAIE DE JOUR")
                    this.events.push({ startDate: journeyStart, endDate: journeyEnd })
                    a=true;

                }
                else {
                    console.log("PAIE DE NUIT")


                    let dateFinishJourney = new Date(journeyStart.getFullYear(), journeyStart.getMonth(), journeyStart.getDate(), 5, 59, 59);
                    let dateBeginNigth = new Date(journeyEnd.getFullYear(), journeyEnd.getMonth(), journeyEnd.getDate(), 6, 0, 0);

                    
                    if (this.verifDay(journeyStart)) {
                        dateFinishJourney = new Date(journeyStart.getFullYear(), journeyStart.getMonth(), journeyStart.getDate(), 21, 59, 59);
                        dateBeginNigth = new Date(journeyEnd.getFullYear(), journeyEnd.getMonth(), journeyEnd.getDate(), 22, 0, 0);
                    }

                    this.events.push({ startDate: journeyStart, endDate: dateFinishJourney });
                    this.events.push({ startDate: dateBeginNigth, endDate: journeyEnd });
                    a=true;

                }


            }
            else {

                let dateFinish;
                let dateBegin;

                if (this.verifDay(journeyStart)) {

                    dateBegin = new Date(journeyStart.getFullYear(), journeyStart.getMonth(), journeyStart.getDate(), 22, 0, 0);
                    dateFinish = new Date(journeyStart.getFullYear(), journeyStart.getMonth(), 1, 5, 59, 59);
                    dateFinish.setDate(dateBegin.getDate() + 1);
                    
                    if (index===0) {
                        this.firstDate(journeyStart,journeyEnd,dateBegin, 21)
                    }
                }
                else {
                    dateBegin = new Date(journeyStart.getFullYear(), journeyStart.getMonth(), journeyStart.getDate(), 6, 0, 0);
                    
                    dateFinish = new Date(journeyStart.getFullYear(), journeyStart.getMonth(), 1, 21, 59, 59);
                    dateFinish.setDate(dateBegin.getDate() + 1);
                    
                    if (index===0) {
                        this.firstDate(journeyStart,journeyEnd,dateBegin, 5)
                    }
                }

                if (dateFinish.getTime() > journeyEnd.getTime()) {
                    if (dateBegin.getTime() >= journeyStart.getTime()) {
                        this.events.push({ startDate: dateBegin, endDate: journeyEnd });
                    }
                    a=true;
                }
                else {

                    journeyStart = this.setDate(dateFinish);
                    journeyStart.setSeconds(dateFinish.getSeconds()+1);
                    
                    this.events.push({ startDate: dateBegin, endDate: dateFinish });
                    this.recursiveEvents(journeyStart,journeyEnd, index++);
                }

            }

    }

    processingDate(startDate, endDate) {
        
        for (i=0; i < dateDiff(startDate, endDate); i++) {

            if (verifDay(startDate)) {
    
                //JOURNÉE
                if (verifSameDay(startDate, endDate)) {
                    
                    //MEME JOURNEE 
    
                    if (verifDay(endDate)) {
                        
                        //ON QUITTE LA BOUCLE 😱
                        
                        this.events.push({ startDate: startDate, endDate: endDate });
                    }
                    else {
                        this.events.push({ startDate: startDate, endDate: false })
    
                        //toprocessing
                        //this.processingDate( , endDate)
    
                    }
    
                }
                else {
                    //PAS MEME JOURNEE DONC FAUT FAIRE NUIT
    
    
    
                }
    
    
    
            }
            else {
    
                //NUIT     
    
            }
        }

    }
    firstDate(journeyStart,journeyEnd, dateBegin, hours) { //Permet d'avoir le firstDate
        let firstFinishJourney = new Date(journeyStart.getFullYear(), journeyStart.getMonth(), 1, hours, 59, 59);
        
        if (hours === 5) {
            firstFinishJourney.setDate(dateBegin.getDate() + 1);
        }
        else {
            firstFinishJourney.setDate(dateBegin.getDate());
        }

        if (journeyEnd.getTime() < firstFinishJourney.getTime() ) {
            firstFinishJourney = journeyEnd;
        }
        
        this.events.push({ startDate: journeyStart, endDate: firstFinishJourney });
    }
    verifSameDay(start, end) {
        if (start.getFullYear() === end.getFullYear() && start.getMonth() === end.getMonth() && start.getDate() === end.getDate()) {
            return true;
        }
        else {
            return false;
        }
    }

    verifDay(date) {
        if (date.getHours() >= 6 && date.getHours() <= 22) {
            //JOURNEE
            return true;
        }
        else {
            //NUIT
            return false;
        }
    }
    dateDiff(date1, date2) {
        date1.setHours(0);
        date1.setMinutes(0, 0, 0);
        date2.setHours(0);
        date2.setMinutes(0, 0, 0);
        var datediff = Math.abs(date1.getTime() - date2.getTime()); // difference 
        return parseInt(datediff / (24 * 60 * 60 * 1000), 10); //Convert values days and return value      
    }

    setDate(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
    }

    getEvents() {
        return this.events;
    }
    getEventsBeautiful() {
        let ggggg = [];
        this.events.forEach((d) => {
            ggggg.push({startDate : d.startDate.toUTCString(), endDate : d.endDate.toUTCString() });
        })
        return ggggg;
    }

}
module.exports = EventForPay