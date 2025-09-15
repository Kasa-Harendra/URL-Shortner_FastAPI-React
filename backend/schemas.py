from pydantic import *

class URLStoreSchema(BaseModel):
    original_link: str
    short_code: str
    created_at: str