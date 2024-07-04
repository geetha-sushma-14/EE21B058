const express = require("express");
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const WINDOW_SIZE = 10;
let numbersWindow = [];
let sum = 0;
let previousNumbersWindow = [];

const prime = 'primes';
const fibo = 'fibo';
const even = 'even';
const rand = 'rand';

// axios.post('http://20.244.56.144/test/auth', {
//     companyName: 'afford',
//   clientID: 'b53c5735-167a-4bb9-a686-34492c193487',
//   clientSecret: 'XPyuMyYmshdzTWdS',
//   ownerName: 'Sushma',
//   ownerEmail: 'ee21b058@iittp.ac.in',
//   rollNo:'EE21B058'

// })
// .then(response => {
//     console.log(response.data);
// })
// .catch(error => {
//     console.error('Error:', error);
// });


app.get('/numbers/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    let ID;
    let numbers=[];
    if (id === 'p') ID = prime;
    else if (id === 'f') ID = fibo;
    else if (id === 'e') ID = even;
    else if (id === 'r') ID = rand;
    console.log(ID);

    const previousNumbersWindow = [...numbersWindow];
    
    const axios = require('axios');
    const url = `http://20.244.56.144/test/${ID}`;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIwMTA2MTU3LCJpYXQiOjE3MjAxMDU4NTcsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImI1M2M1NzM1LTE2N2EtNGJiOS1hNjg2LTM0NDkyYzE5MzQ4NyIsInN1YiI6ImVlMjFiMDU4QGlpdHRwLmFjLmluIn0sImNvbXBhbnlOYW1lIjoiYWZmb3JkIiwiY2xpZW50SUQiOiJiNTNjNTczNS0xNjdhLTRiYjktYTY4Ni0zNDQ5MmMxOTM0ODciLCJjbGllbnRTZWNyZXQiOiJYUHl1TXlZbXNoZHpUV2RTIiwib3duZXJOYW1lIjoiU3VzaG1hIiwib3duZXJFbWFpbCI6ImVlMjFiMDU4QGlpdHRwLmFjLmluIiwicm9sbE5vIjoiRUUyMUIwNTgifQ.PqxXLAwZjJmXdk5-ODzXfTBJMHbNK1KikxFAVQ-AAgw';

    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    let jsonresponse  = await response.json();
    numbers = jsonresponse.numbers;
    console.log(numbers);
    // numbers= [1,2,3,4];
    try {
        console.log('Fetched numbers:', numbers);
        let sum = 0;
        for (let num of numbers) {
            sum += num;
        }
        let size = numbers.length;
        const avg = size ? (sum / size).toFixed(2) : '0.00';

        const response = {
            // numbers: numbersWindow,
            // windowPrevState: previousNumbersWindow,
            // windowCurrState: numbersWindow,
            avg: avg
        };

        res.json(response);
    } catch (error) {
        console.error('Error handling request:', error.message);
        res.status(500).json({ error: 'Failed to fetch numbers from server' });
    }
});


app.get("/",(req,res)=>{
    res.send("root");
})

app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});

