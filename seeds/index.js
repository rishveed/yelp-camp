const mongoose = require('mongoose');
const { descriptors, places } = require('./seedHelpers')
const cities = require('./cities');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log('Database connected');
});

const randomelement = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            author: '605b2d4f73eaef25fb2edb6e',
            title: `${randomelement(descriptors)} ${randomelement(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            geometry:
            {
                coordinates: [cities[random1000].longitude, cities[random1000].latitude],
                type: 'Point'
            },
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde consequatur tempore ut ipsum blanditiis quod est impedit veritatis. Eveniet aut veniam sed, tempora dolorem necessitatibus laudantium pariatur atque impedit saepe?',
            price: price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dv1p1rqv0/image/upload/v1617302241/YelpCamp/lkidchwr36kcegzgnkz9.jpg',
                    filename: 'YelpCamp/lkidchwr36kcegzgnkz9'
                },
                {
                    url: 'https://res.cloudinary.com/dv1p1rqv0/image/upload/v1616857319/YelpCamp/c8mgrxjn8gvqgrusanro.jpg',
                    filename: 'YelpCamp/c8mgrxjn8gvqgrusanro'
                }
            ]
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})