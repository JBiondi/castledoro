from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm


class CustomUserRegistrationForm(UserCreationForm):
    email = forms.EmailField(help_text='', required=False, label='email (optional)')

    username = forms.CharField(help_text='', label='username', max_length=18)
    username.widget.attrs.update({'class': 'registration-form-username'})

    password1 = forms.CharField(help_text='', label='password')
    password2 = forms.CharField(help_text='', label='re-type password')

    class Meta:
        model = User
        fields = ['username', 'password1', 'password2', 'email']
