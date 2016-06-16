const exec  = require('child_process').exec;
process.stdout.write(`\noptimizing parrots..`);

exec('imageoptim -d parrots', function (error, stdout, stderr) {
  if(error) return console.log(error);
  console.log('\ndone!');
});