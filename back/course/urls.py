from django.urls import path
from . import views

urlpatterns = [
   path('courses', views.course_view, name='course'),
   path('courses/<int:id>', views.one_course_view, name='one-course'),
   path('courses/<int:id>/course-write', views.course_write_on, name='course-write'),

   path('courses/<int:id>/tasks', views.tasks_view, name='tasks'),
   path('courses/<int:id>/tasks/<int:task_id>', views.one_task_view, name='one-task'),   
]
