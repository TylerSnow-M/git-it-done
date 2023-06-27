var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var formSubmitHandler = function(event) {
    event.preventDefault();
    console.log(event);

    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        
        //clear old content
        repoContainerEl.textContent = '';
        nameInputEl.value = '';
    } else {
        alert ("please enter a GitHub username");
    }
};

var getUserRepos = function(user) {
    //format the github api url
    var apiUrl = "Https://api.github.com/users/" + user + "/repos";

    //make a reuqest to the url
    fetch(apiUrl)
    .then(function(response){
        if (response.ok) {
            response.json().then(function(data) {
                displayRepos(data, user);
            });
        } else {
            alert("Error: GitHub User Not Found");
        }
    })
    .catch(function(error) {
        alert("Unable to connect to GitHub");
    })
};

var displayRepos = function(repos, searchTerm) {
    //check if api returned any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }

    repoSearchTerm.textContent = searchTerm;

    //loop over repos
    for (var i = 0; i < repos.length; i++) {
        //format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        //create a container for each repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        //create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        //append to container
        repoEl.appendChild(titleEl);

        //append container to the dom
        repoContainerEl.appendChild(repoEl);
    }
};

userFormEl.addEventListener("submit", formSubmitHandler);