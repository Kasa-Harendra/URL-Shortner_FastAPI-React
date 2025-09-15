from pydantic import BaseModel, HttpUrl
from typing import *

class Shorten(BaseModel):
    original_link: HttpUrl
    choice_code: Optional[str] = ''
    length: Optional[int] = 6
