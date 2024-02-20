const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));
app.options('*', cors());
app.get('/getFile/:fileid/:apikey', async (req, res) => {
    try {
        // console.log(req.body);
        const fileid = req.params.fileid;

        // Fetch file content from OpenAI
        const responseOpenAI = await axios.get(`https://api.openai.com/v1/files/${fileid}/content`, {
            headers: {
                Authorization: `Bearer ${req.params.apikey}`
            },
            responseType: 'arraybuffer' // Ensure response type is arraybuffer
        });

        // Convert the received buffer to base64
        const base64Data = Buffer.from(responseOpenAI.data, 'binary').toString('base64');

        // Prepare form data for ImgBB upload
        const formData = new FormData();
        formData.append('key', 'a33e1e04a4f3febcb4277c2cc118f5e3');
        formData.append('image', base64Data);

        // Upload the file to ImgBB using Axios
        const responseImgBB = await axios.post('https://api.imgbb.com/1/upload', formData, {
            headers: formData.getHeaders(),
            maxContentLength: Infinity,
            maxBodyLength: Infinity
        });

        // Send the response back to the client
        res.send(responseImgBB.data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
