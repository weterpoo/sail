from flask import Flask, request
app = Flask(__name__)

@app.route('/')
def hello():
	return 'Hello, world!'

@app.route('/new')
def newEmail():
	if 'email' in request.args:
		return 'endpoint working???'
	else: 	return 'Invalid request! Argument "email" missing!'

if __name__ == '__main__':
	app.debug=True
	app.run('0.0.0.0')

