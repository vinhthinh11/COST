require("@babel/polyfill");
var $9T78N$axios = require("axios");

/* eslint-disable */ 
/* eslint-disable */ 
const $1f15e3e4b50b2b87$export$596d806903d1f59e = async function(email, password) {
    try {
        const res = await (0, $9T78N$axios.axios)({
            method: "POST",
            url: "/api/v1/users/login",
            data: {
                email: email,
                password: password
            }
        });
        // neu dang nhap thanh cong thi chuyen qua trang hompage
        if (res.status === 200) {
            alert("Dang nhap thanh cong");
            location.assign("/");
        }
    } catch (errors) {
        alert(errors.response.data.message);
    }
};


/* eslint-disable */ const $788a06fc251b2835$export$4c5dd147b21b9176 = function() {
    const locations = document.getElementById("map").dataset.locations;
    const coordinate = JSON.parse(locations).map((el)=>el.coordinates);
    const map = L.map("map");
    coordinate.forEach((element, i)=>{
        map.setView([
            element[1],
            element[0]
        ], 7);
        const marker = L.marker([
            element[1],
            element[0]
        ]).bindPopup(`This is the <b>${i + 1}</b> destination!`).openPopup().addTo(map);
    });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        tileSize: 512,
        zoomOffset: -1
    }).addTo(map);
    const currnet = function(position) {
        const popup = L.popup();
        function onMapClick(e) {
            popup.setLatLng(e.latlng).setContent("You clicked the map at " + e.latlng.toString()).openOn(map);
            L.marker([
                e.latlng.lat,
                e.latlng.lng
            ]).addTo(map);
            console.log(e.latlng);
        }
        map.on("click", onMapClick);
    };
};


document.querySelector(".form").addEventListener("submit", (e)=>{
    e.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    (0, $1f15e3e4b50b2b87$export$596d806903d1f59e)(email, password);
});
(0, $788a06fc251b2835$export$4c5dd147b21b9176)();


//# sourceMappingURL=bundle.js.map
