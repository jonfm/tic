(function() {
  var child, devServer, fs, util;

  child = require('child_process');

  fs = require('fs');

  util = require('util');

  devServer = function(procname, procargs) {
    var filechange, restart, server, start, watched;
    server = null;
    watched = [];
    restart = function() {
      util.debug('Stopping server for restart');
      return server.kill();
    };
    start = function() {
      util.debug('Starting dev server');
      server = child.spawn(procname, procargs);
      server.stdout.on('data', function(data) {
        return util.print(data);
      });
      server.stderr.on('data', function(data) {
        return util.print(data);
      });
      server.on('exit', function(code) {
        util.debug('Server process exited: ' + code);
        server = null;
        watched.forEach(function(file) {
          return fs.unwatchFile;
        });
        watched = [];
        return start();
      });
      return child.exec('find . | grep "\.js$"', function(err, stdout, stderr) {
        watched = stdout.trim().split("\n");
        return watched.forEach(function(file) {
          return fs.watchFile(file, {
            interval: 500
          }, function(curr, prev) {
            if (filechange(curr, prev)) {
              util.debug(file + " changed, restarting dev server");
              return restart();
            }
          });
        });
      });
    };
    filechange = function(curr, prev) {
      return curr.mtime.valueOf() !== prev.mtime.valueOf() || curr.ctime.valueOf() !== prev.ctime.valueOf();
    };
    return start();
  };

  devServer('node', ['game.js']);

}).call(this);
