from flask import Blueprint, jsonify,request
from database import db
from dbModels import ApplyJob,summarized
import base64
import os
from resume_summarizer_using_bart_final import BertSummarize
from integrationdictformat import extract_information
from resumerankingusingbertfinal import BertRanking


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
            file_path = f"./Resumes/{email}.pdf"  # Change the file extension based on your actual file type (e.g., .pdf, .docx)
            if os.path.exists(file_path):
                print(f"File with this name already exists. Please choose a different filename.")
            else:
                with open(file_path, "wb") as file:
                    file.write(resumeFile)
                
            
            summary=BertSummarize(file_path)
            matched=BertRanking(file_path,"Seeking a skilled and motivated web developer with expertise in front-end and back-end technologies to contribute to the design, development, and maintenance of innovative and user-friendly web applications")
            # print(summary["summary"])
            matchedPercent=(matched)*100

            newApplication = ApplyJob(email=email,username=name,jobId=JobId,resume = resumeFile)
            newSummarized=summarized(jobId=JobId,email=email,summary=summary["summary"],matched=matchedPercent)
            db.session.add(newApplication)
            db.session.add(newSummarized)
            db.session.commit()
            parsed=(extract_information(file_path))
            print(parsed)
            return jsonify({"success":True,"message":"Application successful","data":parsed})
        

    except Exception as error:
        return ({'error':str(error)})


