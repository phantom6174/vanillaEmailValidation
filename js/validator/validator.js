// IFFY - module pattern for the validation request
// reutrn {object} - the module api
var formValidator = (function(){
    var api = {
        requestCheck: requestCheck
    }

    // performs the check request
    //@param {string} - email to validate
    //@return - request promise
    function requestCheck(email){
        console.log('Initiating request')
        var requestURL = 'https://apilayer.net/api/check?access_key=f8ceb6d332ecb8f1d57befe208a5316b';
        requestURL += "&email=" + email;
        requestURL += "&smtp=1";
        requestURL += "&format=1";

        var request = new XMLHttpRequest();
        
        return new Promise(function (resolve, reject) {
            request.open('POST', requestURL)
            request.send();
            request.onload = function() {
                resolve(request);
            };
            request.onerror = function() {
                reject('Error: request not sent');
            };    
        });          
    }  
    return api;
})();
