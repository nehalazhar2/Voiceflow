const express = require('express');
const OpenAI = require('openai');
const fs = require('fs');
const axios = require('axios');
const app = express();
const port = 3000; // Choose your desired port
const fetch = require('node-fetch');
   const FormData = require('form-data');
// Initialize OpenAI

var cors = require('cors');

app.use(
    cors({
        credentials: true,
        origin: true
    })
);
app.get('/getFile/:fileid/:apikey', async (req, res) => {
    try {
      const fileid = req.params.fileid;
      let base64Data=""
      
      const myHeaders = {
        "Authorization": "Bearer "+req.params.apikey,
        "Cookie": "__cf_bm=GYtgnC2MdmLpmBkjfPtHpaddbOL.IunVXAwpSPfa3mA-1708356337-1.0-AWYdlAcDf1SGoGgeF0IQ7gm77Jd+9qLYtNTM+L6xRP67ALcN7oSyfFx/SZwidVuE2xg3CcfFOGQMAp69QmCod/I=; _cfuvid=Knsf9PgrNn3dGtd56LPZtrjda2lDxBa4aueoilWTUmc-1708356337426-0.0-604800000"
      };
      
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };
      
      fetch("https://api.openai.com/v1/files/"+fileid+"/content", requestOptions)
        .then((response) => response.buffer())
        .then((result) => {
          // Convert the received buffer to base64
           base64Data = result.toString('base64');

      
       
let data = new FormData();
data.append('key', 'a33e1e04a4f3febcb4277c2cc118f5e3');
data.append('image', base64Data);

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://api.imgbb.com/1/upload',
  headers: { 
    ...data.getHeaders()
  },
  data : data
};

axios.request(config)
.then((response) => {
 res.send(response.data);
})
.catch((error) => {
  console.log(error);
});
        })
        .catch((error) => console.error(error));
      




    //   Upload the file to imgBB

      
    
  
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
