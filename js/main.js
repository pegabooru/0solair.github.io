ssID = "1NJrmjnYCJp-E4VJyQa3DmeZtm6-PwsFfkmyDBLrkLAw"

function get() {
    var params = {
    // The ID of the spreadsheet to retrieve data from.
    spreadsheetId: "1NJrmjnYCJp-E4VJyQa3DmeZtm6-PwsFfkmyDBLrkLAw",

    // The A1 notation of the values to retrieve.
    range: 'Sheet1!A:A',
    };

    var request = gapi.client.sheets.spreadsheets.get(params);
    request.then(function(response) {
        console.log(response.result.values[0][0])
    }, function(reason) {
        console.error('error: ' + reason.result.error.message);
    });
}

function initClient() {
    var API_KEY = "AIzaSyA8v4fvkZwDNgqfICcvXxSAypOe1HWk_JM"
    var CLIENT_ID = "461958078181-kq3re2kbr613dg511su21e78ouvg8s29.apps.googleusercontent.com"
    var SCOPE = "https://www.googleapis.com/auth/spreadsheets"

    gapi.client.init({
        'apiKey': API_KEY,
        'clientId': CLIENT_ID,
        'scope': SCOPE,
        'discorveryDocs': ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
    }).then(function() {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
        updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
}

function handleClientLoad() {
    gapi.load('client:auth2',initClient);
}

function updateSignInStatus(isSignedIn) {
    if(isSignedIn) {
        get();
    }
}

function handleSignInClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

function handleSignOutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}
