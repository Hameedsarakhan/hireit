# -*- coding: utf-8 -*-
"""ResumeRankingUsingBertFinal.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1sBgGGmWZ47UpWB-XYuAfR4kK3aNWwLX1

#INSTALLATIONS
"""

"""#IMPORTING DEPENDENCIES"""

from tika import parser
from warnings import filterwarnings
filterwarnings("ignore")
from transformers import BertTokenizer, BertModel
from sklearn.metrics.pairwise import cosine_similarity


"""#PDF TO TEXT CONVERSION"""

def extract_text_from_pdf(path):
  file_data =parser.from_file(path)
  text = file_data['content']
  return text

"""#SAMPLE DATA"""



"""#RANKING USING BERT MODEL"""

def BertRanking(resume_paths,job_desc):
      # Initialize an empty dictionary to store results
      resume_results_dict = {}

      # Load pre-trained BERT model and tokenizer
      tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
      model = BertModel.from_pretrained('bert-base-uncased')

      # Tokenize and get embeddings for each job descripti
      job_desc_tokens = tokenizer(job_desc, return_tensors='pt', truncation=True, padding=True)
      job_desc_embeddings = model(**job_desc_tokens).last_hidden_state.mean(dim=1)
      resume_embeddings = []

          # Tokenize and get embeddings for each resume
      resume_text = extract_text_from_pdf(resume_paths)
      resume_tokens = tokenizer(resume_text, return_tensors='pt', truncation=True, padding=True)
      resume_embedding = model(**resume_tokens).last_hidden_state.mean(dim=1)
      resume_embeddings.append((resume_paths, resume_embedding))

          # Calculate cosine similarity
      similarities = [cosine_similarity(job_desc_embeddings.detach().numpy(), resume_embedding[1].detach().numpy()).item() for resume_embedding in resume_embeddings]

      return(similarities[0])
          # Rank resumes based on similarity
    #   ranked_resumes = sorted(zip(resume_paths, similarities), key=lambda x: x[1], reverse=True)

          # Store results in the dictionary
    #   resume_results_dict[job_desc] = [{"resume_path": resume_path, "similarity": similarity} for resume_path, similarity in ranked_resumes]

      # Print the results
    #   for job_desc_text, results in resume_results_dict.items():
    #       print(f"Job Description: {job_desc_text}")
    #       for rank, result in enumerate(results, start=1):
    #           print(f"  Rank {rank}: Similarity {result['similarity']:.4f} - Resume Path: {result['resume_path']}")

