'python -m uvicorn file:app --reload'
from fastapi import FastAPI, Form, Request, Depends
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import csv
import os
import hashlib

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

FILE_NAME = "logs.csv"
COOKIE_NAME = "user-session"

SECRET_SALT1 = "PAROL_"
SECRET_SALT2 = "_SECURITY"

if not os.path.exists(FILE_NAME):
    with open(FILE_NAME, mode="w", encoding="utf-8", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(["Login", "Password"])


def hash_password(password: str):
    salted_password = f"{SECRET_SALT1}{password}{SECRET_SALT2}"
    return hashlib.sha256(salted_password.encode("utf-8")).hexdigest()


def get_cookie(request: Request):
    return request.cookies.get(COOKIE_NAME)


def find_user_hash(username: str):
    if not os.path.exists(FILE_NAME):
        return None
    with open(FILE_NAME, mode="r", encoding="utf-8") as file:
        reader = csv.DictReader(file)
        for row in reader:
            if row.get("Login") == username:
                return row.get("Password")
    return None


@app.get("/", response_class=HTMLResponse)
def main_page(request: Request):
    return templates.TemplateResponse(request=request, name="based_main.html")


@app.get("/main", response_class=HTMLResponse)
def home_page(request: Request, username: str = Depends(get_cookie)):
    if not username:
        return RedirectResponse(url="/login", status_code=303)

    return templates.TemplateResponse(
        request=request,
        name="main.html",
        context={
            "username": username,
            "password_hash": find_user_hash(username)
        }
    )


@app.get("/login", response_class=HTMLResponse)
def login_page(request: Request, username: str = Depends(get_cookie)):
    if username:
        return RedirectResponse(url="/main", status_code=303)
    return templates.TemplateResponse(request=request, name="login.html")


@app.post("/login")
def login(request : Request, password: str = Form(...), username: str = Form(...)):
    stored_hash = find_user_hash(username)
    if stored_hash is None:
        return templates.TemplateResponse(request=request, name="login_nouser.html")

    if stored_hash != hash_password(password):
        return templates.TemplateResponse(request=request, name="login_wrong_password.html")

    response = RedirectResponse(url="/main", status_code=303)
    response.set_cookie(key=COOKIE_NAME, value=username, httponly=True, max_age=120)
    return response


@app.get("/register", response_class=HTMLResponse)
def register_page(request: Request, msg: str | None = None):
    return templates.TemplateResponse(request=request, name="register.html", context={"msg": msg})


@app.post("/register")
def register(request:Request,password: str = Form(...), username: str = Form(...)):
    if find_user_hash(username) is not None:
        return templates.TemplateResponse(request=request, name="user_exist.html")

    with open(FILE_NAME, mode="a", encoding="utf-8", newline="") as file:
        writer = csv.writer(file)
        writer.writerow([username, hash_password(password)])

    response = RedirectResponse(url="/main", status_code=303)
    response.set_cookie(key=COOKIE_NAME, value=username, httponly=True, max_age=120)
    return response


@app.get("/logout")
def logout(username: str = Depends(get_cookie)):
    response = RedirectResponse(url="/login", status_code=303)
    response.delete_cookie(key=COOKIE_NAME)
    return response


@app.get("/404", response_class=HTMLResponse)
def _404_page(request: Request):
    return templates.TemplateResponse(request=request, name="404.html")
