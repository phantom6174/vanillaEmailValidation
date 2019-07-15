// IFFY - module pattern for the renderer function with dependency injection example
//        p.s. other example may be initialization, i.e. add api function to set the validator 
// @param {function} - function that will perform the validation
// reutrn {object} - the module api
var renderer = (function(validator){
    var api = {
        showValidation: showValidation
    }

    // Performs validation

    function showValidation(){        
        var email = document.getElementById("emailInput").value;
        validator(email).then(function(result){
            console.log('recieved response');
            var json = JSON.parse(result.response);
            var data = json.email ? json : json.error.info ; 
            var resultsContainer = document.getElementById('resultsContainer')
            var list = "";            
            
            if(json.email){
                for(var prop in data){
                    list += "<li class='resultRow'>" + "<p>" + prop + ": </p><p>" + data[prop] + "</p></li>"
                }
                resultsContainer.innerHTML = "<ul>" + list + "</ul>";
                setTimeout(function(){
                    animateRow();
                }, 100) 
            }
            else{
                resultsContainer.innerHTML = "<p>" + data + "</p>";
            }             
        })              
    }

    // animates the resulting row
    function animateRow(){
        var rows = document.getElementsByClassName('resultRow');
        for (var i = 0; i < rows.length; i++){
            rows[i].style ="transition: left 0.6s linear 0s; transition-delay: "+ i / 10 +"s; left: 0%";
        }
    }

    // adds a keypress event for the email input
    document.getElementById('emailInput').addEventListener('keypress', function(event) {
        if (event.keyCode == 13) {
            showValidation();
        }
    });    
    return api;
})(formValidator.requestCheck) // dependency injection example (other solutions are possible)
