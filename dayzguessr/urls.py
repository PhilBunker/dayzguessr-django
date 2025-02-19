from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('viewer/', include('viewer.urls')),  # Include your app's URLs
    path('accounts/', include('django.contrib.auth.urls')), # Built-in auth URLs
    path('', RedirectView.as_view(url='/viewer/', permanent=True)), # Redirect / to /viewer/
]
