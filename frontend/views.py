from django.shortcuts import render
from django.shortcuts import redirect
from users.forms import CustomUserRegistrationForm


def index(request):
    if request.method == 'POST':
        form = CustomUserRegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login_namespace')

    form = CustomUserRegistrationForm()
    context = {'form': form}

    return render(request, 'frontend/index.html', context)
