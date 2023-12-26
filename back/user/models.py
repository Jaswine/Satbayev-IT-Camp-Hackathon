from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    avatar = models.ImageField(blank=True, upload_to='profile/')
    about = models.TextField(blank=True)

    def __str__(self) -> str:
        return self.user.username