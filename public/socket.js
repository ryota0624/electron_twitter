var socket = io.connect();
socket.on('tweet', (tweet) => {
  console.log(tweet)
});