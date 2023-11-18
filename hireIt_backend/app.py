from flask import Flask
from flask_cors import CORS
from database import db
from userRoutes import UserRouter

import os

file_path = os.path.abspath(os.getcwd())+'\\instance\\test.db'

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///'+file_path
app.config["SQLAlchemy_TRACK_MODIFICATIONS"] = False
app.register_blueprint(UserRouter,url_prefix="/user")


db.init_app(app)




@app.route('/')
def hello_world():
    return 'Hello, World!'




with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)