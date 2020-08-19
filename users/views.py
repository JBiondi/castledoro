from django.shortcuts import render
from django.contrib.auth.forms import UserCreationForm


def user_registration(request):
    form = UserCreationForm()

    context = {'form': form}

    return render(request, 'frontend/register.html', context)
