from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.shortcuts import redirect
from .forms import CustomUserRegistrationForm


def user_registration(request):
    if request.method == 'POST':
        form = CustomUserRegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            messages.success(request, f'Account created for {username}, you are now able to log in')
            return redirect('login_namespace')

    form = CustomUserRegistrationForm()

    context = {'form': form}

    return render(request, 'frontend/register.html', context)


@login_required
def user_profile(request):
    return render(request, 'frontend/user_profile.html')
