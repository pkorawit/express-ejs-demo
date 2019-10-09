var { Client } = require('pg')
var uri = 'postgres://mqvvplpgwkwaww:bbe283a5d4ce86d696c0794bfca51f66630f8553225b83bff3880b169880250a@ec2-54-243-147-162.compute-1.amazonaws.com:5432/ddhq6akm6qbbtp?ssl=true'
var client = new Client({
    connectionString: uri,
});
client.connect()
client.query('SELECT * FROM products', (err, res) => {
    console.log(err ? err.stack : res.rows[0].product_name) // Hello World!
    client.end()
})