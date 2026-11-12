#python -m uvicorn main:app --reload

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()

app.mount('/static', StaticFiles(directory='static'), name='static')
templates = Jinja2Templates(directory='templates')

white_urls = ['/', '/login', '/logout', '/register']

@app.get('/', response_class=HTMLResponse)
def main_page(request: Request):
    return templates.TemplateResponse(request=request, name='based_main.html')

@app.get('/home', response_class=HTMLResponse)
def home_page(request: Request):
    return templates.TemplateResponse(request=request,
                                      name='home.html',
                                      context={'username': 'Uzver',
                                               'password_hash': 'qwerty'})

@app.get('/login', response_class=HTMLResponse)
def login_page(request: Request):
    return templates.TemplateResponse(request=request, name='login.html')

@app.post('/login')
def login(request: Request)

@app.get('/register', response_class=HTMLResponse)
def register_page(request: Request):
    return templates.TemplateResponse(request=request, name='register.html')

@app.get('/404', response_class=HTMLResponse)
def four_page(request: Request):
    return templates.TemplateResponse(request=request, name='404.html')


    