



var submit = document.getElementById('submit_btn');


submit.onclick = function () {
    // Make a request to the server and send the name ;
    var request = new XMLHttpRequest();

    // capture a list of name and render it as a list 

    request.onreadystatechange = function () {
        if (request.readyState == XMLHttpRequest.DONE) {

            if (request.status === 200) {
                console.log('user is loged in'); 
            }
            else if(reqest.status === 403){
                alert('username / password incorect');
            }
            else if( request.status === 500) {
                alert('something went wrong with the server '); 
                 
            }
        };




    };
    var username = document.getElementById('username').value;
      var password = document.getElementById('password').value;
 console.log(username);
 console.log(password);
    request.open('POST', "http://adityaghoshsbg.imad.hasura-app.io", true);
    request.setRequestHeader('Content Type ', 'application/json')
    request.send(JSON.stringify({username:username,password:password}));

};