from pymongo import MongoClient
import certifi
import os
from dotenv import load_dotenv

load_dotenv()
mongo_user = os.environ['MONGO_USER']
mongo_pass = os.environ['MONGO_PASSWORD']

def get_database():
    try:
        print("Attempting to connect to MongoDB...")
        ca = certifi.where()
        client = MongoClient(
            f"mongodb+srv://{mongo_user}:{mongo_pass}@urls.mpbleah.mongodb.net/",
            tlsCAFile=ca,
            ssl=True,
            # ssl_cert_reqs='CERT_REQUIRED'
        )
        
        client.admin.command('ping')
        print("Connected Successfully")
        
        db = client['urls_data']
        
        try:
            if 'urls' not in db.list_collection_names():
                collection = db.create_collection(name='urls')
            else:
                collection = db['urls']
            return collection
        except Exception as e:
            print("Error creating/accessing collection: ", e)
            raise e
            
    except Exception as e:
        print("Database connection error: ", e)
        raise e

# Create a global collection variable
collection = get_database()