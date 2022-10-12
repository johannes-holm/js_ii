(function () {
    "use strict";

    //clock

    document.addEventListener("DOMContentLoaded", function () {

        let c = document.getElementById("clock");

        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 100);

        function updateClock() {

            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();
            let av = 'PM';

            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            if (h > 12) {
                h = h - 12;

            }
            else {
                av = 'AM';
            }


            c.innerHTML = h + ":" + m + ":" + s + " " + av;

        };

    });

    // forms

    document.getElementById("form").addEventListener("submit", estimateDelivery);

    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";

    function estimateDelivery(event) {
        event.preventDefault();

        let summa = 0;

        let linn = document.getElementById("linn");
        let kingitus = document.getElementById("v1").checked;
        let kontakt = document.getElementById("v2").checked;
        ;
        let eesnimi = document.getElementById('fname');
        let perenimi = document.getElementById('lname');
        var hasNumber = /\d/;


        if (eesnimi.value === '') {
            alert('Palun sisestage enda eesnimi');
            eesnimi.focus();
            return;
        }
        else if (hasNumber.test(eesnimi.value) === true) {
            alert('Nimes ei tohi olla numbreid');
            return;
        }

        if (perenimi.value === '') {
            alert('Palun sisestage enda perekonnanimi');
            perenimi.focus();
            return;
        }
        else if (hasNumber.test(perenimi.value) === true) {
            alert('ka perekonnanimes ei tohi olla numbreid');
            return;
        }

        if (document.getElementById('visa').checked === false) {
            if (document.getElementById('master').checked === false) {
                if (document.getElementById('krypto').checked === false) {
                    alert('Palun valige maksemeetod');
                    document.getElementById('visa').focus();
                    return;
                }
            }
        }

        if (linn.value === "") {

            alert("Palun valige linn nimekirjast");

            linn.focus();

            return;

        }
        else if (linn.value === "tln") {
            summa += 0;
        }

        else if (linn.value === "trt") {
            summa += 2.5;
        }

        else if (linn.value === "nrv") {
            summa += 2.5;
        }

        else if (linn.value === "prn") {
            summa += 3;
        }
        else {

            e.innerHTML = "x,xx &euro;";

        }

        if (kingitus === true) {
            summa += 5
        }

        if (kontakt === true) {
            summa += 1
        }
        e.innerHTML = summa + ' &euro;';

        console.log("Tarne hind on arvutatud");
    }

})();

// map

let mapAPIKey = "AjMtEmRon5b770hURS3R0xTVb1laowFbixFC3sARAAipsrOIZwnvbpkyxnvLc4eR";

let map, infobox;

function GetMap() {

    "use strict";

    let Tartu = new Microsoft.Maps.Location(58.38104, 26.71992);
    let Viljandi = new Microsoft.Maps.Location(58.3676529, 25.595335);
    let centerPoint = new Microsoft.Maps.Location(58.37, 26.1);

    map = new Microsoft.Maps.Map("#map", {

        credentials: 'AjMtEmRon5b770hURS3R0xTVb1laowFbixFC3sARAAipsrOIZwnvbpkyxnvLc4eR',
        center: centerPoint,
        zoom: 9,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: false

    });

    infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });

    infobox.setMap(map);


    let pushpin = new Microsoft.Maps.Pushpin(Tartu, { // loome markeri

        title: 'Tartu Ülikool',
        //subTitle: 'Hea koht',
        text: 'UT'

    });


    map.entities.push(pushpin);

    Microsoft.Maps.Events.addHandler(pushpin, 'click', pushpinClicked);

    let pushpin_2 = new Microsoft.Maps.Pushpin(Viljandi, {
        title: 'Viljandi kultuuriakadeemia',
        //subTitle: 'kool',
        text: 'VKA'
    });



    map.entities.push(pushpin_2);
    Microsoft.Maps.Events.addHandler(pushpin_2, 'click', pushpinClicked);

    function pushpinClicked(p) {

        if (p.target.metadata) {

            infobox.setOptions({
                location: p.target.getLocation(),
                title: p.target.metadata.title,
                description: p.target.metadata.description,
                visible: true
            });
        }
    }

}


// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

