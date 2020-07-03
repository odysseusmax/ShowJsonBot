import json

from flask import Flask, request
import requests


app = Flask(__name__)

@app.route('/<token>', methods=['POST'])
def handle_tg(token):
  update = request.get_json()
  message=update.get('message')
  if message:
    send_message_params = {
      'chat_id':message['chat']['id'],
      'text':json.dumps(message, indent=4),
      'reply_to_message_id':message['message_id']
    }
    r = requests.post(
      url=f'https://api.telegram.org/bot{token}/sendMessage',
      json=send_message_params
    )
  return 'OK'

app.run(host='0.0.0.0', port=8080)
