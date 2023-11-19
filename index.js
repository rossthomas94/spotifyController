const SpotifyWebApi = require('spotify-web-api-node');

// Set up Spotify API credentials
const spotifyApi = new SpotifyWebApi({
    clientId: '84e54620d0314bf6b345317637496775',
    clientSecret: '368da25c7415492ea6b7f022ffe99cfc',
    redirectUri: 'http://localhost:3000/callback' 
  });
  
  // Get the authorization URL
  const authorizeURL = spotifyApi.createAuthorizeURL(
    ['user-read-private', 'user-read-email', 'user-read-currently-playing'],
  );
  
console.log(authorizeURL);

  const authorizationCode = 'AQDvxG3qoaeuf_U8orQSY04K0mw_KrU032ZAMiDuaX3wexxHakYAXKGvi6Dyskotz-U9U5iUYUHmw5n5SnqW0l-nqNVZWJdCK7WPZWGTXwuz2Pldm3kOeeosYYAMvDbqwxCC1T3B7WlHUS4WSx3kjVMb6TmNaDqFAdr5rowEgUD9Ag3PocAj6XdLxhYUmkYgs99PkkbjPwsWdotj-30J5Tg6CxR6ZDFwWcznb5mt-YHxp0-pKyx9TlFIbtnfDVQ0qjLr'; // Replace this with the actual code

  spotifyApi.authorizationCodeGrant(authorizationCode).then(data => {
    console.log('The token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);
    console.log('The refresh token is ' + data.body['refresh_token']);
  
    // Set the obtained access token in your Spotify API instance
    spotifyApi.setAccessToken(data.body['access_token']);
    spotifyApi.setRefreshToken(data.body['refresh_token']);
  }).catch(err => {
    console.error('Error getting access token:', err);
  });

  // Function to get the currently playing track
const getCurrentlyPlayingTrack = () => {
    return spotifyApi.getMyCurrentPlayingTrack()
      .then(data => {
        return data.body.item ? data.body.item.id : null;
      })
      .catch(err => {
        console.error('Error getting currently playing track:', err);
        throw err;
      });
  };
  
  // Function to play a specific track
  const playTrack = (trackId) => {
    return spotifyApi.play({ uris: [`spotify:track:${trackId}`] })
      .then(() => {
        console.log(`Playing track with ID: ${trackId}`);
      })
      .catch(err => {
        console.error('Error playing track:', err);
        throw err;
      });
  };
  
  const checkAndPlayTrack = () => {

    getCurrentlyPlayingTrack()
      .then(trackId => {
        if (trackId) {
          console.log(`Currently playing track ID: ${trackId}`);
        } else {
          console.log('No track is currently playing.');
        }
      })
      .catch(err => {
        console.error('Error checking track:', err);
      });
  };
  
  const playSpecificTrack = (trackId) => {
    playTrack(trackId)
      .then(() => {
        console.log(`Playing track with ID: ${trackId}`);
      })
      .catch(err => {
        console.error('Error playing track:', err);
      });
  };
  
setInterval(checkAndPlayTrack, 30000); 
  
playSpecificTrack('6qf9OwxTfs6lLRG8Kf1BMA');