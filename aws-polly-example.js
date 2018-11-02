// Example Node.js AWS Polly Script that saves an mp3 file to S3
const AWS = require('aws-sdk')
const fs = require('fs');
AWS.config.loadFromPath('./awscreds.json');

const Polly = new AWS.Polly({
    signatureVersion: 'v4',
    region: 'us-east-1'
})

const s3 = new AWS.S3();
//<amazon:effect name="shout"><prosody rate="fast"></prosody></amazon:effect>
let pollyparams = {
    'Text': '<speak>Hello, I am LuLu from Singapoor. How are you ? It is really cool !</speak>',
    'TextType': "ssml", 
    'OutputFormat': 'mp3',
    'VoiceId': 'Zhiyu'
}

Polly.synthesizeSpeech(pollyparams, (err, data) => {
    if (err) {
        console.log(err.message)
    } else if (data) {
        console.log(data);
        
        if (data.AudioStream instanceof Buffer) {
            fs.writeFile('./test.mp3', data.AudioStream, function(err) 
            { 
              if (err) {
                return console.log(err)
              }
            })
          }
    }
})