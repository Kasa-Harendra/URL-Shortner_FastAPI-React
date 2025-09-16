from fastapi.routing import APIRouter
from fastapi import status
from fastapi.responses import JSONResponse, RedirectResponse
from .models import Shorten
from .db import collection
from utils import generate_short_code, insert_data_into_collection

router = APIRouter(prefix='/api')

@router.post('/shorten')
def shorten(request: Shorten):

    length = int(request.length) if request.length else 6

    if not request.choice_code:
        short_code = generate_short_code(length)
        while len(list(collection.find({'short_code': short_code}))) != 0:
            short_code = generate_short_code(length)        
    else:
        if collection.find_one({'short_code': request.choice_code}):
            return JSONResponse(
                {'message': 'Short Code already exits...'},
                status_code=status.HTTP_302_FOUND
            )
        short_code = request.choice_code
    try:            
        data = insert_data_into_collection(collection, request.original_link, short_code=short_code)
    except Exception as e:
        return JSONResponse(content={
            'message': f'Error occured: {e}'
        }, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return JSONResponse(content=data, status_code=status.HTTP_201_CREATED)

@router.get('/{short_code}')
def navigate(short_code: str):
    if not short_code:
        return JSONResponse(
            {'message': 'No short code provided'},
            status_code=status.HTTP_400_BAD_REQUEST
        )
    data = collection.find_one({'short_code': short_code})
    if not data:
        return JSONResponse(
            {'message': 'Invalid short code'},
            status_code=status.HTTP_406_NOT_ACCEPTABLE
        )
    return RedirectResponse(url=data['original_link'])
    
