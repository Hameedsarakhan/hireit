# api_routes.py
from flask import Blueprint, jsonify,request
from database import db
from flask_bcrypt import Bcrypt
import jwt
from datetime import datetime, timedelta
from localvars import SECRET_KEY
from dbModels import User, Job
from flask_mail import Message
from mail import mail

# from app import mail
# from jwt.exceptions import DecodeError


UserRouter = Blueprint('user', __name__)
bcrypt = Bcrypt()

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


@UserRouter.route('/Job',methods=['GET','POST'])
def AddJob():
    if(request.method=='POST'):
        try:
            jobJSON=request.json
            jobTitle=jobJSON['jobTitle']
            jobDescription=jobJSON['jobDescription']
            jobLevel=jobJSON['jobLevel']
            jobType=jobJSON['jobType']
            jobDeadline=jobJSON['jobDeadline']
            jobEntry=Job(jobTitle=jobTitle,jobDescription=jobDescription,jobDeadline=jobDeadline
                         ,jobType=jobType,jobLevel=jobLevel)
            db.session.add(jobEntry)
            db.session.commit()
            return(jsonify({'msg':'Success'}))
        except:
            return jsonify({'error':'Internal Server Error'}),500
    else:
        try:
            jobs = Job.query.all()
            return (jobs)
        except:
            return jsonify({'error': 'Internal Server Error'}),500


@UserRouter.route('/deleteJob/<int:jobId>',methods=['GET'])
def deleteJob(jobId):
    try:
        Job.query.filter_by(jobId=jobId).delete()
        db.session.commit()
        return(jsonify({"msg":"Deletion successful"}))
    except:
        return(jsonify({"error":"An error occured. Please retry"})),500


@UserRouter.route('/editJob/<int:jobId>',methods=['GET','POST'])
def editJob(jobId):
    if(request.method=='GET'):
        try:
            editData=Job.query.filter_by(jobId=jobId).first()
            return(jsonify(editData))
        except:
            return(jsonify({"error":"An error occured. Please retry"})),500
    else:
        try:
            updatedData=Job.query.filter_by(jobId=jobId).first()
            jobJSON=request.json
            updatedData.jobTitle=jobJSON['jobTitle']
            updatedData.jobDescription = jobJSON['jobDescription']
            updatedData.jobLevel = jobJSON['jobLevel']
            updatedData.jobType = jobJSON['jobType']
            updatedData.jobDeadline = jobJSON['jobDeadline']
            db.session.commit()
            return({"msg":"Updation successful"})
        except:
            return(jsonify({"error":"An error occured. Please retry"})),500


@UserRouter.route('/contact',methods=['POST'])
def contact():
    try:
        contactJSON=request.json
        contactName=contactJSON['name']
        contactEmail=contactJSON['email']
        contactMessage=contactJSON['message']
        msg = Message("Contact attempt by: "+contactName,
                      sender=contactEmail,
                      recipients=["hireit31@gmail.com"])
        msg.body="Information\n\nName:"+contactName+"\nEmail: "+contactEmail+"\nTime: "+str(datetime.now())+"\n\n\n"+"Message\n\n"+contactMessage


        mail.send(msg)
        return(jsonify({"msg":"Successfully sent data"}))
    except:
        return(jsonify({"error":"An error occured."})),500






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
