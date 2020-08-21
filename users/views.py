from django.shortcuts import render
from django.shortcuts import redirect
from .forms import CustomUserRegistrationForm


def user_registration(request):
    if request.method == 'POST':
        form = CustomUserRegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            print('we got here')
            username = form.cleaned_data.get('username')
            return redirect('home_namespace')

    form = CustomUserRegistrationForm()

    context = {'form': form}

    return render(request, 'frontend/register.html', context)
