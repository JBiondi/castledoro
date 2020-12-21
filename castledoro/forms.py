from django import forms
from .models import Castle


class NewCastleForm(forms.ModelForm):

    class Meta:
        model = Castle
        labels = {
            'castle_name': ''
        }
        widgets = {
            'castle_name': forms.TextInput(attrs={'id': 'create-new-castle-name-label'}),
        }
        fields = ['castle_name']


class DeleteCastleForm(forms.ModelForm):

    class Meta:
        model = Castle
        fields = ['castle_name']



