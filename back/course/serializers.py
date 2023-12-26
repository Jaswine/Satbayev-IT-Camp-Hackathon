from rest_framework.serializers import ModelSerializer

from .models import Course, Task
from user.serializers import UserSerializer

class TaskSerializer(ModelSerializer):
   class Meta:
      model = Task
      fields = ('title', 'type', 'points')

class CourseSerializer(ModelSerializer):
   user =  UserSerializer(many=False)
   tasks = TaskSerializer(many=True, read_only=True)

   class Meta:
      model = Course
      fields = ('id', 'title', 'user', 'image', 'description', 'public', 'created', 'tasks')

class CourseTaskSerializer(ModelSerializer):
   class Meta:
      model = Course
      fields = ('id', 'title', )

class OneTaskSerializer(ModelSerializer):
   class Meta:
      model = Task
      fields = '__all__'