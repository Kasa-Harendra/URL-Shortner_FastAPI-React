import pymongo
from .schemas import URLStoreSchema
from datetime import datetime

def generate_short_code(length=6) -> str:
    import random
    import string

    allowed_chars = string.ascii_letters + '0123456789'
    code = ''.join([random.choice(allowed_chars) for _ in range(length)])
    return code

def insert_data_into_collection(
    collection:pymongo.collection.Collection, 
    link: str,
    short_code: str
): 
    data = URLStoreSchema(
        original_link=str(link),
        short_code=short_code,
        created_at=datetime.now().strftime("%d-%m-%Y, %H:%M:%S")
    )

    collection.insert_one(data.dict())

    data = collection.find_one({'short_code': short_code})
    data['_id'] = str(data['_id'])

    return data