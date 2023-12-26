from rest_framework.serializers import ModelSerializer
from .models import Profile
from django.contrib.auth.models import User

class UserSerializer(ModelSerializer):
   class Meta:
      model = User
      fields = ('username', 'email', 'is_superuser')

class ProfileSerializer(ModelSerializer):
   user =  UserSerializer(many=False)
      
   class Meta:
      model = Profile
      fields = ('id', 
                    'user', 
                    'avatar', 
                    'about', )