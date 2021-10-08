DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',  # 사용할 엔진 설정
        'NAME': 'bigdatapjt',  # 연동할 MYSQL의 데이터베이스 이름
        'USER': 'jiahn',
        'PASSWORD': 'jiahn1234',
        'HOST': 'J5B305.p.ssafy.io',
        'PORT': '3306',
    }
}
# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '$mf_eflcngbgne9^*ie8bv!6f&f13j*@b$_^8cist6zd!(vufa'