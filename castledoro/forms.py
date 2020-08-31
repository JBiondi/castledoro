from django import forms
from .models import Castle


class NewCastleForm(forms.ModelForm):

    class Meta:
        model = Castle
        fields = ['castle_name', 'banner_color']


class DeleteCastleForm(forms.ModelForm):

    class Meta:
        model = Castle
        fields = ['castle_name']


