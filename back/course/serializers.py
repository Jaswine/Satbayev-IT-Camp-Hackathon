from rest_framework.serializers import ModelSerializer

from .models import Course, Task, UserCourseProgress
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
   user =  UserSerializer(many=False)
   class Meta:
      model = Course
      fields = ('id', 'title', 'user')

class OneTaskSerializer(ModelSerializer):
   # users = UserSerializer(many=True, read_only=True)
   course = CourseTaskSerializer(many=False)
   class Meta:
      model = Task
      fields = '__all__'
   
class UserCourseProgressSerializer(ModelSerializer):
   user = UserSerializer(many=False)
   course = CourseTaskSerializer(many=False)

   class Meta:
      model = UserCourseProgress
      fields = ('user', 'course', 'points')