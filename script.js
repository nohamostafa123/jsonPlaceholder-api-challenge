function getPosts(userId) {
    let request = new XMLHttpRequest();
    request.open("GET", "https://jsonplaceholder.typicode.com/posts?userId=" + userId);
    request.responseType = "json";
    request.send();
    request.onload = function() {
        if (request.status >= 200 && request.status < 300) {
            let posts = request.response;
            let postsContainer = document.getElementById("posts-container");
            postsContainer.innerHTML = "";
            for (let post of posts) {
                let content = `<div class="post">
                    <h3>${post.title}</h3>
                    <hr>
                    <p>${post.body}</p>
                </div>`;
                postsContainer.innerHTML += content;
            }
        } else {
            alert("Error fetching posts");
        }
    };
}

function getUsers() {
    let request = new XMLHttpRequest();
    request.open("GET", "https://jsonplaceholder.typicode.com/users");
    request.responseType = "json";
    request.send();
    request.onload = function() {
        if (request.status >= 200 && request.status < 300) {
            let users = request.response;
            let usersContainer = document.getElementById("users");
            usersContainer.innerHTML = "";
            for (let user of users) {
                let content = `<div class="user" onclick="userClicked(${user.id}, this)">
                    <h3>${user.name}</h3>
                    <p>${user.email}</p>
                </div>`;
                usersContainer.innerHTML += content;
            }
        } else {
            alert("Error fetching users");
        }
    };
}

function userClicked(id, el) {
    getPosts(id);
    let selectedElements = document.getElementsByClassName("selected");
    for (let element of selectedElements) {
        element.classList.remove("selected");
    }
    el.classList.add("selected");
}

// Initial load
getUsers();
getPosts(1); // Load posts for the first user by default