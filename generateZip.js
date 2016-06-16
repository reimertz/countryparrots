const exec  = require('child_process').exec;
process.stdout.write(`\nzippin' parrots..`);

exec('zip -ur parrots parrots', function (error, stdout, stderr) {
  if(error) return console.log(error);
  console.log('\ndone!');
});