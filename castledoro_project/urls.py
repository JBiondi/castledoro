from django.contrib import admin
from django.urls import path
from django.urls import include
from users import views as user_views

urlpatterns = [
    path('', include('frontend.urls')),
    path('admin/', admin.site.urls),
    path('register/', user_views.user_registration, name='user_registration_namespace'),
]
