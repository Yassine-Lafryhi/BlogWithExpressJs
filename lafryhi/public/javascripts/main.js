var usersNumber = 0;
var number = 0;

function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    if (email.toString().trim() === '' || password.toString().trim() === '') {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Please fill in all the fields !',
            showConfirmButton: false,
            timer: 2000
        })
    } else {
        const body = {
            email: email,
            password: password
        }
        fetch('/users/login', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(body)
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            if (data.code === 1) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Logged in successfully !',
                    showConfirmButton: false,
                    timer: 2000
                }).then((result) => {
                    let role = data.role;
                    let token = data.token;
                    let id = data.id;
                    cookie.set('token', token);
                    cookie.set('role', role);
                    cookie.set('id', id);
                    if (role === 'admin') {
                        window.location.href = "manage-users.html";
                    } else if (role === 'author') {
                        window.location.href = "manage-articles.html";
                    } else {
                        window.location.href = "view-articles.html";
                    }
                });
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: data.message,
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        });
    }
}

function logout() {

    Swal.fire({
        title: 'Are you sure that you want to log out ?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Yes`,
        denyButtonText: `No`,
    }).then((result) => {
        if (result.isConfirmed) {
            cookie.remove('token');
            cookie.remove('role');
            window.location.href = "login.html";
        }
    })
}

function createUser() {
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let role = document.getElementById("role").value;
    if (username.toString().trim() === '') {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Please fill in all the fields !',
            showConfirmButton: false,
            timer: 2000
        })
    } else {
        const body = {
            username: username,
            email: email,
            password: password,
            role: role
        }
        fetch('/users', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookie.get('token')
            },
            method: 'POST',
            body: JSON.stringify(body)
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            if (data.hasOwnProperty('id')) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'User created successfully !',
                    showConfirmButton: false,
                    timer: 2000
                }).then((result) => {
                    let username = document.getElementById("username");
                    let email = document.getElementById("email");
                    let password = document.getElementById("password");
                    let role = document.getElementById("role");
                    username.value = "";
                    email.value = "";
                    password.value = "";
                    role.value = "";
                    getUsersList();
                });
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: data.message,
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        });
    }
}

function createArticle() {
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;
    let userId = cookie.get("id");
    let published = document.getElementById("published").value;
    if (title.toString().trim() === '' || content.toString().trim() === '' || published.toString().trim() === '') {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Please fill in all the fields !',
            showConfirmButton: false,
            timer: 2000
        })
    } else {
        const body = {
            title: title,
            content: content,
            UserId: userId,
            published: published
        }
        fetch('/articles', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookie.get('token')
            },
            method: 'POST',
            body: JSON.stringify(body)
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            if (data.hasOwnProperty('id')) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Article created successfully !',
                    showConfirmButton: false,
                    timer: 2000
                }).then((result) => {
                    let title = document.getElementById("title");
                    let content = document.getElementById("content");
                    let published = document.getElementById("published");
                    title.value = "";
                    content.value = "";
                    published.value = "";
                    getArticlesList();
                });
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: data.message,
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        });
    }
}

function getUsersList(offset) {
    fetch('/users/offset/' + offset + '/limit/' + 5, {
        headers: {
            'Accept': 'application/json',
        },
        method: 'GET'
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data)
        var tr;
        $('#usersList').html('');
        for (var i = 0; i < data.length; i++) {
            tr = $('<tr/>');
            tr.append("<td style='text-align: center'> " + data[i].id + "</td>");
            tr.append("<td style='text-align: center'>" + data[i].username + "</td>");
            tr.append("<td style='text-align: center'>" + data[i].email + "</td>");
            tr.append("<td style='text-align: center'>" + data[i].role + "</td>");
            tr.append("<td style='text-align: center'><button onclick='updateUser(" + data[i].id + ")' style='margin-right: 8px' class=\"btn btn-warning btn-round\" type=\"button\">Update</button><button onclick='deleteUser(" + data[i].id + ")' class=\"btn btn-danger btn-round\" type=\"button\">Delete</button></td>")
            $('#usersList').append(tr);
        }
    });
}

function getArticlesList(offset) {
    fetch('/articles/offset/' + offset + '/limit/' + 5, {
        headers: {
            'Accept': 'application/json',
        },
        method: 'GET'
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        $('#all-articles').html('');
        for (var i = 0; i < data.length; i++) {
            let element = '<div style="text-align: center" class="col-md-4">' +
                '<div style="height: 260px; margin-bottom: 12px" class="card">' +
                '<div class="card-header">' +
                '<h5 style="text-align: center" class="card-title">' + data[i].title + '</h5>' +
                '</div>' +
                '<div class="card-body">' +
                '<p>' + data[i].content + '</p>' +
                '</div>' +
                '</div>' +
                '</div>';
            $('#all-articles').append(element);
        }
    });
}

function sendUpdateRequest(id) {
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let role = document.getElementById("role").value;
    if (username.toString().trim() === '') {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Please fill in all the fields !',
            showConfirmButton: false,
            timer: 2000
        })
    } else {

        const body = {
            username: username,
            email: email,
            password: password,
            role: role
        }
        console.log(body)
        fetch('/users/' + id, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookie.get('token')
            },
            method: 'PUT',
            body: JSON.stringify(body)
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            if (data.status === 200) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'User Updated successfully !',
                    showConfirmButton: false,
                    timer: 2000
                }).then((result) => {
                    let username = document.getElementById("username");
                    let email = document.getElementById("email");
                    let password = document.getElementById("password");
                    let role = document.getElementById("role");
                    let addOrUpdate = document.getElementById("addOrUpdate");

                    username.value = "";
                    email.value = "";
                    password.value = "";
                    role.value = "";
                    addOrUpdate.innerHTML = "Add"
                    addOrUpdate.setAttribute("onclick", "createUser()")
                    getUsersList();
                });
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: data.message,
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        });
    }
}


function deleteUser(id) {


    Swal.fire({
        title: 'Are tou sure that you want to delete this user ?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Yes`,
        denyButtonText: `No`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            fetch('/users/' + id, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + cookie.get('token')
                },
                method: 'DELETE'
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                if (data.status === 200) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'User deleted successfully !',
                        showConfirmButton: false,
                        timer: 1000
                    }).then((result) => {
                        location.reload();
                    });
                }
            });
        } else if (result.isDenied) {
            Swal.fire('Not deleted !', '', 'info')
        }
    })
}


function updateUser(id) {
    fetch('/users/' + id, {
        headers: {
            'Accept': 'application/json',
        },
        method: 'GET'
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        let username = document.getElementById("username");
        let email = document.getElementById("email");
        let password = document.getElementById("password");
        let role = document.getElementById("role");
        let addOrUpdate = document.getElementById("addOrUpdate");

        username.value = data.username;
        email.value = data.email;
        password.value = data.password;
        role.value = data.role;
        addOrUpdate.innerHTML = "Update"
        addOrUpdate.setAttribute("onclick", "sendUpdateRequest(" + data.id + ")")
    });
}


function getNextArticles() {
    document.getElementById("previous").disabled = false;
    if (number < usersNumber) {
        getUsersList(number);
        number += 5;
    }
    if (number === usersNumber) {
        document.getElementById("next").disabled = true;
        number -= 5;
    }
}


function getNextElements() {
    document.getElementById("previous").disabled = false;
    if (number < usersNumber) {
        getArticlesList(number);
        number += 5;
    }
    if (number === usersNumber) {
        document.getElementById("next").disabled = true;
        number -= 5;
    }
}

function getPreviousElements() {
    if (number === 5) {
        document.getElementById("previous").disabled = true;
    }
    if (number > 0) {
        number -= 5;
        getUsersList(number);
    }
    if (document.getElementById("next").disabled) {
        document.getElementById("next").disabled = false;
    }
}


function getUsersNumber() {
    fetch('/users?number', {
        method: 'GET'
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        usersNumber = parseInt(data.message);
        getNextElements();
        document.getElementById("previous").disabled = true;
    });

}


function getArticlesNumber() {
    fetch('/articles?number', {
        method: 'GET'
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        usersNumber = parseInt(data.message);
        getNextElements();
        document.getElementById("previous").disabled = true;
    });

}
