const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
const fs = require('fs');

// Route to display the login form
app.get('/login', (req, res) => {
    res.send(`
        <form action="/" method="POST" id="form" onsubmit="storeUsername()">
            <input type="text" placeholder="Enter your name" id="username">
            <input type="hidden" name="username" id="hidden-username">
            <button type="submit">Send</button>
        </form>
        <script>
            function storeUsername() {
                // Store the username in localStorage and set it to the hidden field
                const username = document.getElementById('username').value;
                localStorage.setItem('username', username);
                document.getElementById('hidden-username').value = username;
            }
        </script>
    `);
});




// Route to display the main form

app.get('/', (req, res) => {
    fs.readFile('data.txt', (err, data) => {
        if (err) {
            data = ' ';
        }
        res.send(`
            ${data}
                <form action="/" method="POST" id="form" onsubmit="storeUsername()">
                    <input type="hidden" name="username" id="hidden-username">
                    <input type="text" placeholder="Enter the Message" name="message" id="message">
                    <button type="submit">Send</button>
                </form>
                <script>
                      function storeUsername() { 
                        const message = document.getElementById('message').value;
                        localStorage.setItem('message', message);

                        const username = localStorage.getItem('username');
                        document.getElementById('hidden-username').value = username;
                    };

                    document.addEventListener('DOMContentLoaded', () => {
                        const username = localStorage.getItem('username');
                        if (username) {
                            document.getElementById('hidden-username').value = username;
                        }
                    });
                </script>
            `);
    })
});

app.post('/', (req, res) => {
    const username = req.body.username;
    // Access username from the form data
    const message = req.body.message || '';
    // Access message from the form data
    console.log('Username:', username);
    console.log('Message:', message);
    fs.writeFile('data.txt', `${username}:${message}<br>`, { flag: 'a' }, (err) => {
        err ? console.log(err) : res.redirect('/');
    })
});


app.listen(3000, () => {
    console.log('The server is listening on port 3000');
});







