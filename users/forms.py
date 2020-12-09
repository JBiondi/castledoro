from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm


class CustomUserRegistrationForm(UserCreationForm):
    email = forms.EmailField(help_text='Optional (only used for password reset)', required=False)
    username = forms.CharField(help_text='')
    password1 = forms.CharField(help_text='')
    password2 = forms.CharField(help_text='')

    class Meta:
        model = User
        fields = ['username', 'password1', 'password2', 'email']
