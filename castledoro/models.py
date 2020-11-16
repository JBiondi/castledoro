from django.db import models
from django.contrib.auth.models import User


class Castle(models.Model):
    castle_id = models.AutoField(primary_key=True)
    associated_user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    castle_name = models.CharField(default='Castle Name', max_length=40)
    total_blocks = models.IntegerField(default=165)
    completed_blocks = models.IntegerField(default=0)
    last_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.castle_name
