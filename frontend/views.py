from django.contrib.auth import authenticate, login
from django.shortcuts import render
from django.shortcuts import redirect
from users.forms import CustomUserRegistrationForm


def index(request):
    if request.method == 'POST':
        form = CustomUserRegistrationForm(request.POST)
        if form.is_valid():
            new_user = form.save()
            new_user = authenticate(username=form.cleaned_data['username'],
                                    password=form.cleaned_data['password1'],
                                    )
            login(request, new_user)
            return redirect('user_profile_namespace')

    form = CustomUserRegistrationForm()
    context = {'form': form}

    return render(request, 'frontend/index.html', context)
