



### Django 시작하기

- 가상환경 실행하기

```bash
.\venv\Scripts\activate
```

-> 터미널 앞쪽에 (venv)라는 표시가 있으면 가상환경이 켜진것임!

- 가상환경 종료하기

```bash
deactivate
```

- 가상환경(venv)에 설치된 패키지 목록

```bash
pip freeze > requirements.txt
```

- 패키지 설치하기

```bash
pip install -r requirements.txt
```



- 앱 만들기

```bash
python manage.py startapp 앱이름
```

-> 만들고 꼭 등록을 해주어야함 `settings.py`의 `INSTALLED_APPS`에 맨 위에 등록하기 