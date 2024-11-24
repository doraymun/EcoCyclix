from flask import Flask, request
from modules import router

app = Flask(__name__)

@app.route("/<service>/<action>", methods=["GET", "POST", "PUT"])
def post(service, action):
    return router.route(service, action, request)    