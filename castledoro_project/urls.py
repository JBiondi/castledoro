from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.urls import path
from django.urls import include
from users import views as user_views
from castledoro import views as castledoro_views


urlpatterns = [
    path('', include('frontend.urls')),
    path('admin/', admin.site.urls),
    path('register/', user_views.user_registration, name='user_registration_namespace'),
    path('login/', auth_views.LoginView.as_view(template_name='frontend/login.html'), name='login_namespace'),
    path('logout/', auth_views.LogoutView.as_view(template_name='frontend/logout.html'), name='logout_namespace'),
    path('user_profile/', user_views.user_profile, name='user_profile_namespace'),
    path('create_new_castle/', castledoro_views.create_new_castle, name='create_castle_namespace'),
    path('delete_castle/', castledoro_views.delete_castle, name='delete_castle_namespace'),
    path('make_progress_on_existing_castle/', castledoro_views.make_progress_on_existing_castle,
         name='progress_namespace'),
    path('session_completed_api_endpoint/', castledoro_views.session_completed_api_endpoint,
         name='session_completed_namespace'),
]
