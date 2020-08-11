from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    location = models.CharField(max_length=50,default=None)
    phone = models.CharField(max_length=10,default=None)
    role = models.CharField(max_length=32,default=None)
    first_name = None;
    last_name = None;
    last_login = None;
    date_joined = None;
    #email = None;

class Items(models.Model):
    itemdesc = models.CharField(max_length=50)
    status = models.CharField(max_length=50)
    helper_id = models.IntegerField()
    reacher_id = models.IntegerField()
    price = models.IntegerField()
    reacher_score = models.IntegerField()
    helper_score = models.IntegerField()
    bargain_price = models.IntegerField()
    class Meta:
        db_table = "items"








