// there are the require files
var request = require('request');
var token = require('./secrets.js');
var fs = require('fs');

// implementing commant line variables
var commandOne = process.argv[2];
var commandTwo = process.argv[3];

console.log('Welcome to the GitHub Avatar Downloader!'); // logs a welcome message

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url:
      'https://api.github.com/repos/' +
      repoOwner +
      '/' +
      repoName +
      '/contributors',
    headers: {
      'User-Agent': 'request',
      Authorization: 'token ' + token.GITHUB_TOKEN,
    },
  };

  // If the user does not specify both arguments,
  // the program should not attempt a request.
  // It should instead terminate with an error message letting the user know about the problem.
  if (commandOne === undefined || commandTwo === undefined) {
    console.log('There is an error!');
    return false;
  }

  request(options, function(err, res, body) {
    var data = JSON.parse(body);
    data.forEach(function(element) {
      cb(err, body);
    });
  });
}

function downloadImageByURL(url, filePath) {
  request(url).pipe(fs.createWriteStream(filePath));
}

getRepoContributors(commandOne, commandTwo, function(err, result) {
  var url = result.avatar_ural;
  var filePath = 'avatar/' + result.login + '.jpg';
  downloadImageByURL(url, filePath);
});
