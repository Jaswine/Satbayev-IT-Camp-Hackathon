
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import (HTTP_200_OK, 
                                   HTTP_401_UNAUTHORIZED,
                                   HTTP_403_FORBIDDEN,
                                   HTTP_400_BAD_REQUEST,
                                   HTTP_201_CREATED,
                                   HTTP_404_NOT_FOUND,
                                   HTTP_204_NO_CONTENT,
                                   )
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User

from .serializers import CourseSerializer, OneTaskSerializer

from .models import Course, Task, UserCourseProgress
from user.models import Profile
from .serializers import CourseSerializer, UserSerializer, UserCourseProgressSerializer


# SHOW / CREATE Course
@api_view(['GET', 'POST'])
def course_view(request):
    if request.method == 'GET':
        courses = Course.objects.all()

        return Response(CourseSerializer(courses, many=True).data, 
                                        status=HTTP_200_OK)
    
    elif request.method == 'POST':
        authorization_header = request.headers.get('Authorization')

        if authorization_header and authorization_header.startswith('Bearer '):
            access_token = authorization_header.split(' ')[1]
        
            # try:
            decoded_token = RefreshToken(access_token, verify=False)
            user_id = decoded_token.payload.get('user_id')

            course = Course.objects.create(
                title = request.data['title'],
                description = request.data['description'],
                user = User.objects.get(id=user_id),
                image = request.FILES.get('image'),
                public = request.data['public'],
            )

            course.save()
            
            return Response({'message': 'Course created successfully'}, 
                    status=HTTP_200_OK)
            # except:
            #     return Response({'message': 'Token incorrect'}, 
            #                 status=HTTP_403_FORBIDDEN)  
        else:
            return Response({'message': 'Token not found'}, 
                            status=HTTP_401_UNAUTHORIZED)     

    else:
        return Response({
            'message': 'Method not allowed'
        }, status=HTTP_400_BAD_REQUEST)    
    
# SHOW / UPDATE  / DELETE Course
@api_view(['GET', 'PUT', 'DELETE'])
def one_course_view(request, id):
    try:
        course = Course.objects.get(id=id)
                            
        if request.method == 'GET':
            course = Course.objects.get(id=id)

            authorization_header = request.headers.get('Authorization')

            if authorization_header and authorization_header.startswith('Bearer '):
                access_token = authorization_header.split(' ')[1]
            
                # try:
                decoded_token = RefreshToken(access_token, verify=False)
                user_id = decoded_token.payload.get('user_id')

                user = User.objects.get(id=user_id)

                if course.users_who_registered.filter(id=user.id):
                    status = 'Зарегистрирован'
                else:
                    status = 'Зарегистрироваться'

                return Response({
                    "user": UserSerializer(user, many=False).data,
                    "course_status": status,
                    'course': CourseSerializer(course, many=False).data
                }, status = HTTP_200_OK)
            
            return Response({'message': 'Token not found'}, 
                                status=HTTP_401_UNAUTHORIZED)   

        elif request.method == 'PUT':
            authorization_header = request.headers.get('Authorization')

            if authorization_header and authorization_header.startswith('Bearer '):
                access_token = authorization_header.split(' ')[1]
            
                try:
                    decoded_token = RefreshToken(access_token, verify=False)
                    user_id = decoded_token.payload.get('user_id')

                    if user_id == course.user.id:
                        course.title =  request.data['title']
                        course.description =  request.data['description']
                        course.image =  request.data['image']
                        course.public = request.data['public']

                        course.save()
                        
                        return Response({'message': 'Course created successfully'}, 
                                status=HTTP_200_OK)
                except:
                    return Response({'message': 'Token incorrect'}, 
                                status=HTTP_403_FORBIDDEN)  
            else:
                return Response({'message': 'Token not found'}, 
                                status=HTTP_401_UNAUTHORIZED)     

        if request.method == 'DELETE':
            course.delete()
            return Response({'message': 'Course deleted successfully'}, 
                                status=HTTP_204_NO_CONTENT)     
        
    except:
      return Response({
         'detail': 'Not found.'
         }, status=HTTP_404_NOT_FOUND)
    
# SHOW ALL / CREATE Task
@api_view(['GET', 'POST'])
def tasks_view(request, id):
    try:
        course = Course.objects.get(id=id)

        if request.method == 'GET':
             tasks = Task.objects.filter(course=course)
             return Response(OneTaskSerializer(tasks, many=True).data, 
                        status = HTTP_200_OK)

        if request.method == 'POST':
            authorization_header = request.headers.get('Authorization')

            if authorization_header and authorization_header.startswith('Bearer '):
                access_token = authorization_header.split(' ')[1]
            
                # try:
                decoded_token = RefreshToken(access_token, verify=False)
                user_id = decoded_token.payload.get('user_id')

                if user_id == course.user.id:
                    task = Task.objects.create(
                        title = request.data['title'],
                        type = request.data['type'],
                        points = request.data.get('points'),
                        course=course,
                    )

                    text = request.data.get('text')

                    if text:
                        task.text = text
                    
                    video = request.FILES.get('video')

                    if video:
                        task.video = video

                    task.save()
                    
                    return Response({'message': 'Task created successfully'}, 
                            status=HTTP_200_OK)
                # except:
                #     return Response({'message': 'Token incorrect'}, 
                #                 status=HTTP_403_FORBIDDEN)  
            else:
                return Response({'message': 'Token not found'}, 
                                status=HTTP_401_UNAUTHORIZED)     
        
    except:
      return Response({
         'detail': 'Not found.'
         }, status=HTTP_404_NOT_FOUND)
    
# SHOW ONE / UPDATE / DELETE Task
@api_view(['GET', 'PUT', 'DELETE'])
def one_task_view(request, id, task_id):
    try:
        course = Course.objects.get(id=id)
        task = Task.objects.get(id=task_id)

        print('REQUEST_METHOD', request.method)


        if request.method == 'GET':
             return Response(OneTaskSerializer(task, many=False).data, 
                         status = HTTP_200_OK)
        
        elif request.method == 'DELETE':
            task.delete()
            return Response({'message': 'Task deleted successfully'}, 
                                status=HTTP_204_NO_CONTENT)     
        
        elif request.method == 'PUT':
            authorization_header = request.headers.get('Authorization')

            if authorization_header and authorization_header.startswith('Bearer '):
                access_token = authorization_header.split(' ')[1]

                try:
                    decoded_token = RefreshToken(access_token, verify=False)
                    user_id = decoded_token.payload.get('user_id')

                    if user_id == course.user.id:
                        task.title = request.data['title']
                        task.type = request.data['type']
                        task.points = request.data['points']
                        task.course = course

                        text = request.data['text']

                        if text:
                            task.text = text
                        
                        video = request.FILES.get('video')

                        if video:
                            task.video = video

                        task.save()
                        
                        return Response({'message': 'Task updated successfully'}, 
                                status=HTTP_200_OK)
                except:
                    return Response({'message': 'Token incorrect'}, 
                                status=HTTP_403_FORBIDDEN)  
            else:
                return Response({'message': 'Token not found'}, 
                                status=HTTP_401_UNAUTHORIZED)     
        
    except:
      return Response({
         'detail': 'Not found'
         }, status=HTTP_404_NOT_FOUND)
    
# 
@api_view(['POST'])
def course_write_on(request, id):
    if request.method == 'POST':
        try:
            course = Course.objects.get(id=id)

            authorization_header = request.headers.get('Authorization')

            if authorization_header and authorization_header.startswith('Bearer '):
                access_token = authorization_header.split(' ')[1]
            
                # try:
                decoded_token = RefreshToken(access_token, verify=False)
                user_id = decoded_token.payload.get('user_id')

                user = User.objects.get(id=user_id)
        
                if course.users_who_registered.filter(id=user.id):
                    course.users_who_registered.remove(user)

                    return Response({
                        'message': 'You unregistered successfully!'
                        }, status=HTTP_200_OK)
                else:
                    course.users_who_registered.add(user)

                if UserCourseProgress.objects.filter(course=course, user=user):
                    print("...")
                else:
                    UserCourseProgress.objects.create(course=course, user=user, points=0)

                return Response({
                    'message': 'You registered successfully!'
                    }, status=HTTP_200_OK)

        except:
            return Response({
                'detail': 'Not found'
                }, status=HTTP_404_NOT_FOUND)
        

@api_view(['POST'])
def task_complete(request, id, task_id):
    if request.method == 'POST':
        # try:
            course = Course.objects.get(id=id)
            task = Task.objects.get(id=task_id)

            authorization_header = request.headers.get('Authorization')

            if authorization_header and authorization_header.startswith('Bearer '):
                access_token = authorization_header.split(' ')[1]
            
                decoded_token = RefreshToken(access_token, verify=False)
                user_id = decoded_token.payload.get('user_id')

                user = User.objects.get(id=user_id)

                if course.users_who_registered.filter(id=user.id):
                    if task.users.filter(id=user.id):
                        return Response({
                            'message': 'You got experience with this task'
                        }, status=HTTP_200_OK)
                    else:
                        task.users.add(user)

                        profile = Profile.objects.get(user=user)
                        profile.points += task.points
                        profile.save()

                        ucp = UserCourseProgress.objects.filter(course=course, user=user).first()
                        
                        if ucp:
                            ucp.points += task.points

                        ucp.save()

                        return Response({
                        'message': 'Progress updated successfully!'
                        }, status=HTTP_200_OK)
                    
                else:
                    return Response({
                    'message': ' You need to register'
                    }, status=HTTP_400_BAD_REQUEST)
            else:
                    return Response({
                    'message': ' You need to register'
                    }, status=HTTP_400_BAD_REQUEST)
        # except:
        #     return Response({
        #         'detail': 'Not found'
        #         }, status=HTTP_404_NOT_FOUND)
        
@api_view(['GET'])
def diary(request):
    if request.method == 'GET':
        try:
            authorization_header = request.headers.get('Authorization')

            if authorization_header and authorization_header.startswith('Bearer '):
                access_token = authorization_header.split(' ')[1]
            
                decoded_token = RefreshToken(access_token, verify=False)
                user_id = decoded_token.payload.get('user_id')

                user = User.objects.get(id=user_id)

                ucps = UserCourseProgress.objects.filter(user=user)

                return Response(UserCourseProgressSerializer(ucps, many=True).data, 
                                status=HTTP_200_OK)
            else:
                    
                    return Response({
                    'message': ' You need to register'
                    }, status=HTTP_400_BAD_REQUEST)
        except:
            return Response({
                'detail': 'Not found'
                }, status=HTTP_404_NOT_FOUND)
        