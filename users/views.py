from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect

from castledoro.forms import NewCastleForm
from castledoro.models import Castle


@login_required
def user_profile(request):
    form = NewCastleForm()

    if request.method == 'POST':
        form = NewCastleForm(request.POST)
        if form.is_valid():
            temp_form = form.save(commit=False)
            temp_form.associated_user_id_id = request.user.id
            form.save(commit=True)

            return redirect('user_profile_namespace')

    current_user = request.user
    castles_queryset = Castle.objects.filter(associated_user_id_id=current_user.id).order_by('last_modified')
    current_castles_array = []
    completed_castles_array = []

    for castle in castles_queryset:
        if castle.completed_blocks < castle.total_blocks:
            current_castles_array.append(castle)
        else:
            completed_castles_array.append(castle)

    context = {'current_castles': current_castles_array, 'completed_castles': completed_castles_array, 'form': form}
    return render(request, 'frontend/user_profile.html', context)
