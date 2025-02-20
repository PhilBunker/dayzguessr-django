# viewer/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.panoramic_view, name='panoramic_view'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('location_selected/<str:game>/<str:map_name>/<str:location_type>/', views.location_selected, name='location_selected'),
]
