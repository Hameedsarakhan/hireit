from database import db
from dataclasses import dataclass
class User(db.Model):
    id = db.Column( db.Integer, primary_key = True)
    username = db.Column(db.String(100),nullable= False)
    email = db.Column(db.String(50))
    password = db.Column(db.String(50))

    def __repr__(self) -> str:
        return f"{self.id}-{self.username}-{self.email }"

@dataclass
class Job(db.Model):
    jobId:int=db.Column(db.Integer,primary_key=True)
    jobTitle:str = db.Column(db.String(100),nullable= False)
    jobDescription:str = db.Column(db.String(2500),nullable=False)
    jobType:str = db.Column(db.String(100),nullable= False)
    jobLevel:str=db.Column(db.String(20),nullable=False)
    jobDeadline:str = db.Column(db.String(20),nullable=False)

#didnt add __repr__ qke wo masle karraha tha GET mai
@dataclass
class ApplyJob(db.Model):
    email = db.Column(db.String(50) , nullable=False , primary_key=True)
    username = db.Column(db.String(100),nullable= False)
    resume = db.Column(db.LargeBinary, nullable=False)
    jobId = db.Column( db.Integer)


@dataclass
class summarized(db.Model):
    jobId:int = db.Column(db.Integer,nullable=False,primary_key=True)
    email:str = db.Column(db.String(50) , nullable=False,primary_key=True)
    summary:str=db.Column(db.String(1500),nullable=False)
    matched:int=db.Column(db.Integer,nullable=False)
    