from django.urls import path

from . import views

urlpatterns = [
   # auth
   path('auth/sign-up', views.sign_up_view, name='sign-up'),
   path('auth/sign-in', views.sign_in_view, name='sign-in'),
   path('auth/sign-out', views.sign_out_view, name='sign-out'),
    
   # profile
   path('profile/<str:username>', views.show_profile_view, name='profile'),
]