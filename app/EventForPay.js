class EventForPay {

    constructor(event) {
        this.events = [];
        console.log
        let startDate = event.startDate;
        let endDate = event.endDate;

        let journeyStart = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startDate.getHours(), startDate.getMinutes(), startDate.getSeconds());
        let journeyEnd = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), endDate.getHours(), endDate.getMinutes(), endDate.getSeconds());

        this.process(journeyStart, journeyEnd)
        console.log(this.process(journeyStart, journeyEnd));
    }

    dateDiff(date1, date2) {
        date1.setHours(0);
        date1.setMinutes(0, 0, 0);
        date2.setHours(0);
        date2.setMinutes(0, 0, 0);
        var datediff = Math.abs(date1.getTime() - date2.getTime()); // difference 
        return parseInt(datediff / (24 * 60 * 60 * 1000), 10); //Convert values days and return value      
    }
    // whats the convention in your code? French? English? 
    //camelCase? underscore_seperated? we should have conventions in our code....
    // This does something... but not the right thing. Use TDD nextime.
    premier_jour(journeyStart, journeyEnd) {
        let heuredefin = journeyEnd.getHours()
        let heurededebut = journeyStart.getHours()
        if (heurededebut <= 22) {
            nbhours = heuredefin - heurededebut
            return "paiedejour d'une durée de :" + nbhours
        } else {
            return "paiedenuit d'une duree de :" - nbhours
        }
    }

    dernier_jour(journeyStart, journeyEnd) {
        let heuredefin = journeyEnd.getHours()
        let heurededebut = journeyStart.getHours()
        let dureeinter = heuredefin - 6
        let dureeinter2 = heuredefin + 6 - 22
        if (heuredefin <= 6 && heuredefin >= 0) {
            return "paiedenuit d'une duree de :" + heuredefin
        } else if (heuredefin <= 22 && heuredefin >= 6) {
            return "paie de jour d'une durée de:" + dureeinter + "paie de nuit d'une duree de 6"
        } else {
            return "paie de jour d'une duree de : 16  paie de nuit d'une duree de :"
            dureeinter2
        }
    }

    process(journeyStart, journeyEnd) {
        let nbdejour = this.dateDiff(journeyEnd, journeyStart)
        let paiesdejour = nbdejour * 16
        let paiesdenuit = nbdejour * 8
        nb_heures_der = this.dernier_jour(journeyStart, journeyEnd)
        nb_heures_pre = this.premier_jour(journeyStart, journeyEnd)
        return nb_heures_der, nb_heures_pre, "nb de paies de jour intermediares " + paiesdejour, "nb de paies de nuit intermediares " + paiesdenuit
    }