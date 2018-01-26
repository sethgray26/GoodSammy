
module.exports = {

    getDateString: function() {
        let d = new Date()
        let hours = '0'+d.getHours()
        hours = hours.substring(hours.length -2)
        let minutes = '0'+d.getMinutes()
        minutes = minutes.substring(minutes.length -2)
        let seconds = '0'+d.getSeconds()
        seconds = seconds.substring(seconds.length -2)
        let timestamp = ''
        timestamp = hours + ':' + minutes + ':' + seconds
        return timestamp
    }

}