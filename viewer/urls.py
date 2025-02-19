# viewer/urls.py (no changes needed here)
from django.urls import path
from . import views

urlpatterns = [
    path('', views.panoramic_view, name='panoramic_view'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
]
