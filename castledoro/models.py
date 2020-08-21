from django.db import models
from django.contrib.auth.models import User


class Castle(models.Model):
    castle_id = models.AutoField(primary_key=True)
    associated_user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    castle_name = models.CharField(default='Castle Name', max_length=40)
    total_blocks = models.IntegerField(default=250)
    completed_blocks = models.IntegerField(default=0)
    banner_color = models.CharField(default='blue', max_length=25)
