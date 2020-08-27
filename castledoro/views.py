from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.shortcuts import redirect
from .forms import NewCastleForm


@login_required
def create_new_castle(request):
    if request.method == 'POST':
        form = NewCastleForm(request.POST)
        if form.is_valid():
            temp_form = form.save(commit=False)
            temp_form.associated_user_id_id = request.user.id
            form.save(commit=True)
            username = request.user.username
            messages.success(request, f'New castle created for {username}, called ...')
            return redirect('user_profile_namespace')

    form = NewCastleForm()

    context = {'form': form}

    return render(request, 'frontend/create_new_castle.html', context)
