def jwt_response_payload_handler(token, user=None, request=None):
    return {
        'token': token,
        'nickname': user.nickname,
        'user_pk' : user.uid,
        'email' : user.email,
        'profile_img': user.profileimg,
        'surveyed': user.surveyed
    }