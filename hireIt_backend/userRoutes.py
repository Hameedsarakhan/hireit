# api_routes.py
from flask import Blueprint, jsonify,request
from database import db
from flask_bcrypt import Bcrypt
import jwt
from datetime import datetime, timedelta
from localvars import SECRET_KEY
# from jwt.exceptions import DecodeError

 




UserRouter = Blueprint('user', __name__)
bcrypt = Bcrypt()

class User(db.Model):
    id = db.Column( db.Integer, primary_key = True)
    username = db.Column(db.String(100),nullable= False)
    email = db.Column(db.String(50))  
    password = db.Column(db.String(50))

    def __repr__(self) -> str:
        return f"{self.id}-{self.username}-{self.email }"


@UserRouter.route('/login', methods=['POST'])
def user_signup():
    try:
        json = request.json 
        email = json['email'] 
        password = json['password']    
        user = User.query.filter_by(email=email).first()
        print(user)
        if not user:
            return jsonify({'error':'Invalid Credentials'}),404
    
        matchPassword = bcrypt.check_password_hash(user.password, password)
        if not matchPassword:
            return jsonify({'error':'Invalid Credentials'}),404
        
        expiration_time = datetime.utcnow() + timedelta(hours=9999)
        token_payload = {'id': user.id, 'exp': expiration_time}
        token = jwt.encode(token_payload, SECRET_KEY, algorithm='HS256')
    
        return jsonify({'authToken':token}),200
    except:
        return jsonify({'message':"Internal Server Error"}),500


   



@UserRouter.route('/getid', methods=['POST'])
def getId():
    try:
        authToken = request.headers.get('authToken')
        
        decoded_token = jwt.decode(authToken, SECRET_KEY, algorithms=['HS256'])
        user_id = decoded_token['id']
       

        return jsonify({"id":user_id})
    except :
        return  jsonify({'message':'Please authenticate using a valid token'})
















# This code was used for creating the user in User Table

# @Login.route('/signup', methods=['POST'])
# def user_signup():
#     # user = User.query.get(id)
#     hashedpassword = bcrypt.generate_password_hash('hireIt123').decode('utf-8')
#     user = User(id = 111,username="daniyal",email="daniyal@gmail.com",password=hashedpassword)
#     # db.create_all()
#     db.session.add(user) 
#     db.session.commit()
#     if user:
#         return jsonify({
#             'id': user.id,
#             'username': user.username,
#             'email': user.email,
#         })
#     else:
#         return jsonify({'error': 'Internal Server Error'}), 500
