from flask import Flask, request, jsonify, render_template
import csv
import datetime

app = Flask(__name__)

subuject_id = 0
singal = "TestSignal"
updown = "up"

@app.route("/")
def home():
    return render_template('index.html', singal=singal, updown=updown)

@app.route('/record_action', methods=['POST'])
def record_action():
    data = request.json
    now = datetime.datetime.now()
    with open('actions.csv', 'a', newline='') as file:
        writer = csv.writer(file)
        writer.writerow([now, subuject_id, singal, updown, data['action'], data['audio1'], data['audio2']])
    return jsonify({'status': 'success'})

if __name__ == "__main__":
    app.run(debug=True)