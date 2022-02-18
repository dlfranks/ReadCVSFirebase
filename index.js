const fs = require('fs'); 
const csv = require('csv-parser');
const https = require('https');

const inputFilePath = './test.csv';

const axios = require('axios');

const postData = {
    Name: 'User Name2',
    Age: 33
}


const create = (data) => {
    axios.post('https://jinyoungdemo-default-rtdb.firebaseio.com/Demo2.json', data)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.log(error);
    });

}

const list = () => {
    axios.get('https://jinyoungdemo-default-rtdb.firebaseio.com/Demo2.json')
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.log(error);
    });
}

// https.get('https://jinyoungdemo-default-rtdb.firebaseio.com/Demo.json', (resp) => {
//   let data = '';

//   // A chunk of data has been received.
//   resp.on('data', (chunk) => {
//     data += chunk;
//   });

//   // The whole response has been received. Print out the result.
//   resp.on('end', () => {
//     console.log(data);
//   });

// }).on("error", (err) => {
//   console.log("Error: " + err.message);
// });

const readCSV = () => {
    fs.createReadStream(inputFilePath)
    .pipe(csv())
    .on('data', function(data){
        try {
            console.log("Name is: "+data.Name);
            console.log("Age is: " + data.Age);
            let newData= { Name: data.Name, Age: data.Age };
            create(newData);
            //perform the operation
            
        
        }
        catch (err) {
            console.log("request error");
            //error handler
        }
    })
    .on('end',function(){
        //some final operation
        console.log("The end of reading the file. ");
    });  
}

//readCSV();
list();

