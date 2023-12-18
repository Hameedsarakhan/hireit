# api_routes.py
from flask import Blueprint, jsonify,request
from database import db
from flask_bcrypt import Bcrypt
from datetime import datetime, timedelta
from localvars import SECRET_KEY
from dbModels import User, Job,ApplyJob
from flask_mail import Message
from mail import mail
import base64
<<<<<<< HEAD
import jwt
=======
     
>>>>>>> 287bae62916bc9612cce7c566b920685d89680b4
# from app import mail
# this file was (UserRouter) is now AdminRouter and new UserRouter is used for applyingJobs api


AdminRouter = Blueprint('admin', __name__)
bcrypt = Bcrypt()

@AdminRouter.route('/login', methods=['POST'])
def admin_signup():
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
    except Exception as e :
        return jsonify({'message':e}),500


def getId(request):
    try:
        authToken = request.headers.get('authToken')
        if len(authToken) <=0 :
            raise ValueError("Token not provided")
        decoded_token = jwt.decode(authToken, SECRET_KEY, algorithms=['HS256'])
        user_id = decoded_token['id']

        if isinstance(user_id, (int, str)):
            return user_id
        else:
            raise TypeError('Invalid user_id type')


    except jwt.InvalidTokenError:
        raise ValueError('Invalid token')
    
    except Exception as e:
        raise ValueError(f'An error occurred: {e}')
  
# to test the getIDfucntion
@AdminRouter.route('/getid', methods=['GET'])
def fetchAdmin():
    try:
        user_id = getId(request=request)
        print(user_id)
        return 'true',200

    except Exception as e:
        return jsonify({'error': str(e)}), 401



@AdminRouter.route('/Job',methods=['GET','POST'])
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

# to delete job
@AdminRouter.route('/deleteJob/<int:jobId>',methods=['GET'])
def deleteJob(jobId):
    try:
        Job.query.filter_by(jobId=jobId).delete()
        db.session.commit()
        return(jsonify({"msg":"Deletion successful"}))
    except:
        return(jsonify({"error":"An error occured. Please retry"})),500

# to edit job
@AdminRouter.route('/editJob/<int:jobId>',methods=['GET','POST'])
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

# Contact us
@AdminRouter.route('/contact',methods=['POST'])
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



# Display All resume 
@AdminRouter.route('/getresume',methods=['GET'])
def getResume():
    try:
        resumes = ApplyJob.query.with_entities(ApplyJob.resume).all() 
        serialized_resumes = [base64.b64encode(resume[0]).decode('utf-8') for resume in resumes]

        return jsonify({'resumes': serialized_resumes})    
    except Exception as error:
        return error














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
