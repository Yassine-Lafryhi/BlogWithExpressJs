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
                })
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
            tr.append("<td><button style='margin-right: 8px' class=\"btn btn-warning btn-round\" type=\"button\">Update</button><button class=\"btn btn-danger btn-round\" type=\"button\">Delete</button></td>")
            $('#usersList').append(tr);
        }
    });
}
