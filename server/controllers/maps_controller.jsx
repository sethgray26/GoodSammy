const axios =require('axios');

module.exports = {

    setLocation: (req, res, next ) => {
        const db = req.app.get('db')
        db.setLocation(req.params.id,req.body.lng,req.body.lat).then( d => 
            res.status(200).send(d))
    },

    getDistance: (req, res, next ) => {
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=${req.body.type}&origins=${req.body.lat1},${req.body.lon1}&destinations=${req.body.lat2},${req.body.lon2}&key=AIzaSyCIIg2weQK6p4wUTy6nXrCj4-hPGgA40xI`
        axios.get(url).then( dist => 
            {
            res.status(200).send(JSON.stringify(dist.data))})
    }
}