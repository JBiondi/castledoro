from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import AuthenticationForm
from django.shortcuts import render
from django.shortcuts import redirect
from users.forms import CustomUserRegistrationForm


def index(request):
    registration_form = CustomUserRegistrationForm()
    login_form = AuthenticationForm()

    if request.method == 'POST':
        registration_form = CustomUserRegistrationForm(request.POST)
        login_form = AuthenticationForm(request.POST)

        if login_form.is_valid():
            return redirect('user_profile_namespace')

        if registration_form.is_valid():
            new_user = registration_form.save()
            new_user = authenticate(username=registration_form.cleaned_data['username'],
                                    password=registration_form.cleaned_data['password1'],
                                    )
            login(request, new_user)
            return redirect('user_profile_namespace')

    context = {'registration_form': registration_form, 'login_form': login_form}

    return render(request, 'frontend/index.html', context)
