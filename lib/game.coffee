# npm-managed modules
express = require 'express'
app     = express.createServer()
io      = require 'socket.io'
fs      = require 'fs'
util    = require 'util'

# These modules are in the public folder so they can be used clientside too
tic     = require('./public/js/tic.js').tic
don     = require('./public/js/don.js').Don
views   = require('./public/js/views.js').views


# Compile css from son
son      = require('./public/js/son.js').Son
sonsheet = './public/css/styles.js'
styles   = require(sonsheet).styles

fs.writeFile './public/css/styles.css', son.render(styles), (err) ->
        if not err
                util.debug sonsheet + " compiled to css"


# Models
page =
        title: "Tic Tac Toe"
        body:  "Example"
        js:    ["/js/jquery","/js/tic","/socket.io/socket.io","/js/don","/js/client"] # combine/compile in production
        css:   ["styles"]


# Http
app.configure -> app.use express.static(__dirname + '/public')

app.get '/', (req, res) -> res.send don.render(page, views.layout)

app.listen 3000


# Socket


