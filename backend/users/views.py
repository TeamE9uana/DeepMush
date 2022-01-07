from django.http.response import JsonResponse
from rest_framework.views import APIView
from config.models import Profile
from rest_framework import status

class MyProfileView(APIView):
    def post(self,request):
        """
        Profile Model의 특정 사용자 검색
        """
        ### Parsing Data ###
        user = request.POST.get('user')
        result = None
        status_code = None

        ### Checking User Existence ###
        if Profile.objects.get(user=user).exists():
            result = Profile.objects.get(user=user)
            status_code = status.HTTP_200_OK
        else :
            result = {'errMsg':'No User'}
            status_code = status.HTTP_404_NOT_FOUND

        return JsonResponse(result,status=status_code)
