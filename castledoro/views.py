import json

from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render
from django.shortcuts import redirect

from .forms import NewCastleForm
from .forms import DeleteCastleForm
from .models import Castle


@login_required
def create_new_castle(request):
    if request.method == 'POST':
        form = NewCastleForm(request.POST)
        if form.is_valid():
            temp_form = form.save(commit=False)
            temp_form.associated_user_id_id = request.user.id
            form.save(commit=True)

            return redirect('user_profile_namespace')

    form = NewCastleForm()

    context = {'form': form}

    return render(request, 'frontend/create_new_castle.html', context)


@login_required
def delete_castle(request):
    if request.method == 'POST':
        form = DeleteCastleForm(request.POST)

        if form.is_valid():
            current_user = request.user
            castle_name = form.cleaned_data['castle_name']
            relevant_castle = Castle.objects.filter(associated_user_id_id=current_user.id, castle_name=castle_name)
            relevant_castle.delete()

            return redirect('user_profile_namespace')

    form = DeleteCastleForm

    context = {'form': form}

    return render(request, 'frontend/delete_castle.html', context)


@login_required
def make_progress_on_existing_castle(request):
    requested_castle_id = request.GET['castle']
    castle_in_progress = Castle.objects.get(castle_id=requested_castle_id)
    request.session['progress_id'] = requested_castle_id
    request.session['previously_completed_blocks'] = castle_in_progress.completed_blocks

    context = {'castle_in_progress': castle_in_progress, 'castle_id': requested_castle_id}

    return render(request, 'frontend/make_progress_on_existing_castle.html', context)


@login_required
def session_completed_api_endpoint(request):
    if request.method == 'POST':
        relevant_id = request.session['progress_id']
        relevant_castle = Castle.objects.get(castle_id=relevant_id)

        if relevant_castle.completed_blocks < relevant_castle.total_blocks:
            print(f'Completed blocks was {relevant_castle.completed_blocks}')
            relevant_castle.completed_blocks += 1
            relevant_castle.save()
            print(f'Completed blocks is now {relevant_castle.completed_blocks}')

        else:
            print('You already finished this castle, how about making a new one?')

        completed_blocks = relevant_castle.completed_blocks
        json_completed_blocks = json.dumps(completed_blocks)

        return HttpResponse(json_completed_blocks, content_type='application/json')


@login_required
def populate_prev_blocks_api_endpoint(request):
    previously_completed_blocks = request.session['previously_completed_blocks']
    json_previously_completed_blocks = json.dumps(previously_completed_blocks)

    return HttpResponse(json_previously_completed_blocks, content_type='application/json')