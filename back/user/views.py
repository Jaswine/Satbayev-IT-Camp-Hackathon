from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.status import (HTTP_200_OK, 
                                   HTTP_401_UNAUTHORIZED,
                                   HTTP_403_FORBIDDEN,
                                   HTTP_400_BAD_REQUEST,
                                   HTTP_201_CREATED,
                                   HTTP_404_NOT_FOUND,
                                   HTTP_500_INTERNAL_SERVER_ERROR
                                   )
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth.hashers import make_password

from .validation import validate_email, validate_username
from .utils import authenticate
from .serializers import ProfileSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated

from .models import Profile


@api_view(['POST'])
def sign_up_view(request):
   username = validate_username(request.data['username'])
   email = validate_email(request.data['email'])
   password = request.data['password']
   password_confirmation = request.data['password_confirmation']
      
   if password_confirmation != password:
      return Response({'message': 'Passwords does not match password'},
                       status=HTTP_400_BAD_REQUEST)
   
   if User.objects.filter(username=username) or User.objects.filter(email=email):
      return Response({'message': 'Username or email does not match'},
                       status=HTTP_400_BAD_REQUEST)
      
   user = User.objects.create(
      username=username, 
      email=email, 
      password=make_password(password))
   
   refresh  = RefreshToken.for_user(user)
   
   refresh_token = str(refresh)
   token = str(refresh.access_token)
   
   return Response({
      'refresh_token': refresh_token,
      'access_token': token,
      'user': UserSerializer(user, many=False).data,
      }, status=HTTP_201_CREATED)


@api_view(['POST'])
def sign_in_view(request):
   email = request.data.get('email')
   password = request.data.get('password')
   user  = authenticate(email, password)
   
   if user is not None:
      refresh = RefreshToken.for_user(user)
      
      refresh_token = str(refresh)
      access_token = str(refresh.access_token)
   
      return Response({
         'refresh_token': refresh_token,
         'access_token': access_token,
        'user': UserSerializer(user, many=False).data,
         }, status=HTTP_200_OK)
   else:
      return Response({'message': 'user not found'}, 
         status=HTTP_401_UNAUTHORIZED)
   
   
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def sign_out_view(request):
   authorization_header = request.headers.get('Authorization')

   if authorization_header and authorization_header.startswith('Bearer '):
        access_token = authorization_header.split(' ')[1]
  
        if access_token:
            return Response({'message': 'Logout successful'}, 
                    status=HTTP_200_OK)
        else:
            return Response({'message': 'Token incorrect'}, 
                       status=HTTP_403_FORBIDDEN)  
   else:
       return Response({'message': 'Token not found'}, 
                       status=HTTP_401_UNAUTHORIZED)     
  
@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def show_profile_view(request, username):
    try:
        user = User.objects.get(username=username)
        profile = Profile.objects.get(user=user)

        if request.method == 'GET':
            return Response(ProfileSerializer(profile).data, status=HTTP_200_OK)

        elif request.method == 'PUT':
            # Ensure that the user making the request matches the user in the token
            if request.user != user:
                return Response({'message': 'Token incorrect'}, status=HTTP_403_FORBIDDEN)

            avatar = request.FILES.get('avatar')
            about = request.data.get('about')

            if avatar:
                profile.avatar = avatar

            if about and profile.about != about:
                profile.about = about

            username = request.data.get('username')
            email = request.data.get('email')

            if username and user.username != username:
                user.username = username

            if email and user.email != email:
                user.email = email

            profile.save()
            user.save()

            return Response({'message': 'User has been updated successfully'}, status=HTTP_200_OK)

        else:
            return Response({'message': 'Method not supported'}, status=HTTP_400_BAD_REQUEST)

    except User.DoesNotExist:
        return Response({'detail': 'User not found.'}, status=HTTP_404_NOT_FOUND)

    except Profile.DoesNotExist:
        return Response({'detail': 'Profile not found.'}, status=HTTP_404_NOT_FOUND)

    except Exception as e:
        # Handle other exceptions as needed
        return Response({'detail': str(e)}, status=HTTP_500_INTERNAL_SERVER_ERROR)

