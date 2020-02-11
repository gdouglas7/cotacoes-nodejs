const request = require('request')

const api_token = '5pu9YizuRXNgQetceU5LkvtdeL0HZOaTgZ0E50dUWXnun4C9aQj4PbD2NU0W'

const cotacao = (symbol, callback) => {
        
    const url = `https://www.worldtradingdata.com/api/v1/stock?symbol=${symbol}&api_token=${api_token}`

    request({url: url, json: true}, (error, response) => {
        if(error){           
            callback({
                message: `Something went worng: ${error}`,
                code: 500
            }, undefined)
        }

        if(response.body === undefined || response.body.data === undefined){
            callback({
                message: `No data found`,
                code : 404
            }, undefined)
        }

        const parsedJSON = response.body.data[0]

        const { symbol, price_open, price, day_high, day_low } = parsedJSON       

        callback(undefined, { symbol, price_open, price, day_high, day_low })
    })
}

module.exports = cotacao