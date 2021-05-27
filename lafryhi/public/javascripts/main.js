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
        console.log(body)
        fetch('/users', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
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

function getUsersList() {
    fetch('/users', {
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
            tr.append("<td>" + data[i].id + "</td>");
            tr.append("<td>" + data[i].username + "</td>");
            tr.append("<td>" + data[i].email + "</td>");
            tr.append("<td>" + data[i].role + "</td>");
            tr.append("<td><button onclick='updateUser(" + data[i].id + ")' style='margin-right: 8px' class=\"btn btn-warning btn-round\" type=\"button\">Update</button><button onclick='deleteUser(" + data[i].id + ")' class=\"btn btn-danger btn-round\" type=\"button\">Delete</button></td>")
            $('#usersList').append(tr);
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
                'Content-Type': 'application/json'
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
    fetch('/users/' + id, {
        headers: {
            'Accept': 'application/json',
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
                getUsersList();
            });
        }
    });
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
