var getUserRepos = function(user) {
    //format the github api url
    var apiUrl = "Https://github.com/users/" + user + "/repos";

    //make a reuqest to the url
    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            console.log(data);
        });
    });
};

  getUserRepos();