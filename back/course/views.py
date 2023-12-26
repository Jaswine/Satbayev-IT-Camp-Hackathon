
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

from .models import Course, Task
from .serializers import CourseSerializer


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

            return Response(CourseSerializer(course, many=False).data, 
                         status = HTTP_200_OK)

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
    