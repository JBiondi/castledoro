from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.urls import path
from django.urls import include
from users import views as user_views


urlpatterns = [
    path('', include('frontend.urls')),
    path('admin/', admin.site.urls),
    path('register/', user_views.user_registration, name='user_registration_namespace'),
    path('login/', auth_views.LoginView.as_view(template_name='frontend/login.html'), name='login_namespace'),
    path('logout/', auth_views.LogoutView.as_view(template_name='frontend/logout.html'), name='logout_namespace'),
    path('user_profile/', user_views.user_profile, name='user_profile_namespace')
]
