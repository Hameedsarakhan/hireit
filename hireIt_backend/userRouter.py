from flask import Blueprint, jsonify,request
from database import db
from dbModels import ApplyJob
import base64
from resume_summarizer_using_bart_final import BertSummarize
from resumerankingusingbertfinal import BertRanking
from integrationdictformat import extract_information



UserRouter = Blueprint('user', __name__)

# Apply job Api


@UserRouter.route('/', methods=['POST'])
def applyJob():
    try:
        # validating inputs
        try:
            body = request.json
            email = body['email'] 
            name = body['name'] 
            JobId = body['jobId']    
            base64_resumeFile = body['resumeFile']
            resumeFile = base64.b64decode(base64_resumeFile)

        except Exception as error:
            return jsonify({"error": str(error)}), 400

        # Checking if there is job application already exists in the database for this jobID with same email or resume
        existing_resume = ApplyJob.query.filter_by(resume=resumeFile,jobId=JobId).first()
        existing_email = ApplyJob.query.filter_by(email=email,jobId=JobId).first()

        if existing_email:
            return jsonify({"success":False,"error":"An application with given email has already been registered for this job"}),400

        if existing_resume:
            return jsonify({"success":False,"error":"An application with given resume has already been registered for this job"}),400      
        
        else:
            newApplication = ApplyJob(email=email,username=name,jobId=JobId,resume = resumeFile)
            db.session.add(newApplication)
            db.session.commit()
            print("done")
            return jsonify({"success":True,"message":"Application successful"})
        

    except Exception as error:
        return ({'error':str(error)})


