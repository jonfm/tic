# Runs a dev server
# 1) Watches coffee files, compiles them to js when they change
# 2) Watches js files, restarts app when they change

child    = require 'child_process'
fs       = require 'fs'
util     = require 'util'

devServer = (procname, procargs) ->

        server     = null
        watched    = []

        restart = ->
                util.debug 'Stopping server for restart'
                server.kill()

        start = ->

                # run main web app
                # whenever it it exited, it starts again
                util.debug 'Starting dev server'
                server = child.spawn procname, procargs
                server.stdout.on 'data', (data) -> util.print data
                server.stderr.on 'data', (data) -> util.print data

                server.on 'exit', (code) ->

                        util.debug('Server process exited: ' + code)
                        server = null
                        watched.forEach (file) -> fs.unwatchFile
                        watched = []
                        start()

                # watch js, restart on change
                child.exec 'find . | grep "\.js$"', (err, stdout, stderr) ->

                        watched = stdout.trim().split "\n"

                        watched.forEach (file) ->

                                fs.watchFile file, interval: 500, (curr,prev) ->

                                        if filechange curr, prev

                                                util.debug(file + " changed, restarting dev server")
                                                restart()

        filechange = (curr,prev) ->
                curr.mtime.valueOf() != prev.mtime.valueOf() or curr.ctime.valueOf() != prev.ctime.valueOf()


        start()


devServer 'node', ['game.js']
