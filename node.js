const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/:token', async (req, res) => {
    var token = req.params.token;
    var update = req.body;
    console.log(update)
    var message = update.message;
    if (message){
        var messageString = JSON.stringify(message, undefined, 4);
        try{
            var r = await axios.post(
                `https://api.telegram.org/bot${token}/sendMessage`,
                {
                    chat_id:update.message.chat.id,
                    text:messageString,
                    reply_to_message_id:message.message_id
                }
            );
            console.log(r.data);
        }
        catch(e){
            console.log(e)
        }
    }
    res.send('ok')
});

app.listen(3000, () => {
  console.log('server started');
});
