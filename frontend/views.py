from django.contrib.auth import authenticate, login
from django.shortcuts import render
from django.shortcuts import redirect
from users.forms import CustomUserRegistrationForm


def index(request):
    registration_form = CustomUserRegistrationForm()

    if request.method == 'POST':
        registration_form = CustomUserRegistrationForm(request.POST)

        if registration_form.is_valid():
            new_user = registration_form.save()
            new_user = authenticate(username=registration_form.cleaned_data['username'],
                                    password=registration_form.cleaned_data['password1'],
                                    )
            login(request, new_user)
            return redirect('user_profile_namespace')

    context = {'registration_form': registration_form}

    return render(request, 'frontend/index.html', context)
