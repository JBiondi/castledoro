from django import forms
from .models import Castle


class NewCastleForm(forms.ModelForm):

    class Meta:
        model = Castle
        labels = {
            'castle_name': 'create a new castle'
        }
        fields = ['castle_name']


class DeleteCastleForm(forms.ModelForm):

    class Meta:
        model = Castle
        fields = ['castle_name']



