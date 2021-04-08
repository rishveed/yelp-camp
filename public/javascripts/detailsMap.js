mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'details-map', // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 7// starting zoom
});

map.addControl(new mapboxgl.NavigationControl());


new mapboxgl.Marker({ color: '#de0b0b' })
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h4>${campground.title}</h4><p>${campground.location}</p>`
            )
    )
    .addTo(map)

