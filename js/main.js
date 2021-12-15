// Change button colors when hovering over them
document.getElementById("update-button").addEventListener("mouseover", ev => { // Load images button
    document.getElementById("update-button").style.backgroundColor = '#8FB1E0'
})
document.getElementById("update-button").addEventListener("mouseout", ev => {
    document.getElementById("update-button").style.backgroundColor = '#A1C7FF'
})

// Notifications
function notify(msg, color) {
    var notifier = document.getElementById("notify");
    notifier.style.backgroundColor = color
    var notifierText = document.getElementById("notifyText");
    notifierText.innerText = msg;
    notifier.style.visibility = 'visible';
    setTimeout(() => {notifier.style.visibility='hidden'}, 5000);
}
function comparelist(taglist, list, min_list){
    for (var a of list) {
        if (!(taglist.includes(a))){
            return false
        }
    }
    for (var b of min_list) {
        if (taglist.includes(b)) {
            return false
        }
    }
    return true
}

function search_len(result, list, min_list) {
    files= []
    for(i = 0; i < result.values.length; i++){
        var url = result.values[i][0]
        var tags = result.values[i][1].slice(2, -2).split("', '")
        if (comparelist(tags, list, min_list)){
            files[i] = {
                url: url,
                tags: tags
            }
        }
    }
    return files
}

function enterclick(inputElement) {
    inputElement.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("update-button").click();
      }
    }); 
}
var input = document.getElementById("tags");
enterclick(input)
input = document.getElementById("page");
enterclick(input)

ssID = "1NJrmjnYCJp-E4VJyQa3DmeZtm6-PwsFfkmyDBLrkLAw"

function get() { // Not important, ignore this
    var params = {
    // The ID of the spreadsheet to retrieve data from.
    spreadsheetId: ssID,

    // The A1 notation of the values to retrieve.
    range: 'Sheet1',
    };

    var request = gapi.client.sheets.spreadsheets.values.get(params);
    request.then(function(response) {
    }, function(reason) {
    console.error('error: ' + reason.result.error.message);
    });
}

function addImgsAll() { // Load all images with specified tags
    
    document.getElementById('body').innerHTML = "";
    var params = {
        spreadsheetId: ssID,
        range: 'Sheet1!A:B',
    };

    var request = gapi.client.sheets.spreadsheets.values.get(params);
    request.then(function(response) {

        var page = parseInt(document.getElementById("page").value)
        if (isNaN(page)){
            page = 1;
        }
        var file_nums = (page * 25)

        var query = document.getElementById('tags').value.split(', ');
        var min_query = [];
        for(let x = 0; x < query.length; x++){
            if (query[x][0] == '-') {
                min_query.push(query[x].substring(1));
                query.splice(x, 1);
            }
        }
        if (query[0] == "") {
            query = []
        }
        //let i = 0;
        //let p = 0
        //let LoadedImages = 0;
        files = search_len(response.result, query, min_query)
        total_pages = Math.ceil(files/25)
        console.log(total_pages)
        for(i = (file_nums - 25); i < file_nums; i++) {
            if (files[i][url].match(/\.(mp4|webm|mov)$/)) { // To add support for another file extension that displays on a website, add |extensionhere after the last extension.
                var imgs = document.createElement("video");
                imgs.setAttribute("controls","controls")
                imgs.setAttribute("loop","true")
            } else {
                var imgs = document.createElement("img");
            }
        var src = document.getElementById("body"); 
        imgs.src = files[i][1];
        src.appendChild(imgs);
        imgs.style.width = '450px';
        imgs.style.height = 'auto';
        imgs.style.border = "5px";
        //LoadedImages += 1
        }
        /*while (i < response.result.values.length && LoadedImages < 25) {
            // Add images to website
            if (comparelist(response.result.values[i][1].slice(2, -2).split("', '"), query, min_query)){
                if (LoadedImages <= 25 && p >= (file_nums-25)) {
                        if (response.result.values[i][0].match(/\.(mp4|webm|mov)$/)) { // To add support for another file extension that displays on a website, add |extensionhere after the last extension.
                            var imgs = document.createElement("video");
                            imgs.setAttribute("controls","controls")
                            imgs.setAttribute("loop","true")
                        } else {
                            var imgs = document.createElement("img");
                        }
                    var src = document.getElementById("body"); 
                    imgs.src = response.result.values[i][0];
                    src.appendChild(imgs);
                    imgs.style.width = '450px';
                    imgs.style.height = 'auto';
                    imgs.style.border = "5px";
                    LoadedImages += 1
                }      
                p++;
                    
            }
            i++; 
            
        }
        */
    }, function(reason) { // Obviously just print the error if there is one
        console.error('error: ' + reason.result.error.message);
    });
}



function initClient() { // Runs right as the user enters the website.
    var API_KEY = 'AIzaSyA8v4fvkZwDNgqfICcvXxSAypOe1HWk_JM';

    var CLIENT_ID = '461958078181-kq3re2kbr613dg511su21e78ouvg8s29.apps.googleusercontent.com';
    
    var SCOPE = 'https://www.googleapis.com/auth/spreadsheets'; // Scope

    gapi.client.init({
    'apiKey': API_KEY,
    'clientId': CLIENT_ID,
    'scope': SCOPE,
    'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    })
}

function handleClientLoad() { // When a client loads the page
    gapi.load('client:auth2', initClient);
}
