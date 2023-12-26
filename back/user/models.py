from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    avatar = models.ImageField(blank=True, upload_to='profile/')
    about = models.TextField(blank=True)
    points = models.IntegerField(default = 0)

    def __str__(self) -> str:
        return self.user.username
    

class Subject(models.Model):
    title = models.CharField(max_length=250, blank=True, unique=True, verbose_name="Предмет")
    
    class Meta:
        verbose_name = "Предмет"
        verbose_name_plural = "Предмет"

    def __str__(self) -> str:
        return self.title

class SubjectRaiting(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, verbose_name="Пользователь", null=True)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, verbose_name="Предмет")
    count = models.IntegerField(default =0, verbose_name="Оценка")

    def __str__(self) -> str:
        return self.title
    
    class Meta:
        verbose_name = "Оценка ученика за предмет"
        verbose_name_plural = "Оценка ученика за предмет"
    

class Chat(models.Model):
   user1 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user1')
   user2 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user2')
   
   def __str__(self):
       return self.slug

class Message(models.Model):
   chat = models.ForeignKey(Chat, on_delete=models.SET_NULL, null=True)
   user = models.ForeignKey(User, on_delete=models.CASCADE)
   
   message = models.TextField(max_length=10000)
   
   created = models.DateTimeField(auto_now_add=True)
   updated = models.DateTimeField(auto_now=True)
   
   def __str__(self):
      return '{} - {} - {}'.format(self.chat.name, self.user.username, self.created)