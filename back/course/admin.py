from django.contrib import admin
from .models import (
        Course, 
        Task,
        UserCourseProgress,)

admin.site.register(Course)
admin.site.register(Task)
# admin.site.register(UserCourseProgress)