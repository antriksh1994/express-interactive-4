var express = require('express')
var app = express()
var url = require('url')
var request = require('request')

var options = {
    protocol: 'https:',
    host: 'openlibrary.org',
    pathname: '/search.json',
    query: {
        q: 'programming'
    }
}
var searchUrl = url.format(options)
console.log('===searchUrl', searchUrl)

var qoutes = {
    einstein: 'Life is like riding a bicycle. To keep balance you must be moving.',
    crockford: 'The good thing about reinventing the wheel is that you can get a round one',
    'berners-lee': 'The web does not just connect machines, it connects people.'
}
// TASK:- route with dynamic arguments in the url path and responds with the proper author
// <!-- instead of trying to write the quote to the response. lets try using an EJS template to render the response -->
app.get('/quotes/:name', (req, res) => {
    let quote = qoutes[req.params.name]
    res.render('quote.ejs', {
        name: req.params.name,
        quote: quote
    })
})
app.get('/searchurl', (req, res) => {
    request(searchUrl).pipe(res)
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.listen(8080)