from django.db import models
from django.contrib.auth.models import User


class Course(models.Model):
    title = models.CharField(max_length=250)
    description = models.TextField(blank=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    image = models.ImageField(upload_to='courses/',blank=True)

    public = models.BooleanField(default=True)

    users_who_registered = models.ManyToManyField(User, related_name='users_who_registered', blank=True)
    user_likes = models.ManyToManyField(User, blank=True, related_name='user_likes')

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.title
    
class Task(models.Model):
    TASKTYPES = (
        ('TaskText', 'TaskText'),
        ('TaskVideo', 'TaskVideo'),
    )

    title = models.CharField(max_length=250)
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True)
    type = models.CharField(max_length=30, choices=TASKTYPES, blank=True)
    points = models.IntegerField(default=0)

    video = models.FileField(upload_to='courses/tasks/videos', blank=True)
    text = models.TextField(default="", blank=True)

    @classmethod    
    def video_task(cls, video):
        return Task.objects.create(
            type = "TaskVideo",
            video = video,
        )
        
    @classmethod
    def text_task(cls, text):
        return Task.objects.create(
            type = 'TaskText',
            text = text,
        )
    
    def __str__(self) -> str:
        return self.title
    