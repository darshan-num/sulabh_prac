from .serializers import UsersSerializer, ItemsSerializer
from rest_framework import viewsets
from .models import User
from .models import Items



class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UsersSerializer

class ItemsViewSet(viewsets.ModelViewSet):
    queryset = Items.objects.all()
    serializer_class = ItemsSerializer


"""
class UserUpdate():
    queryset = User.objects.all()
    lookup_field = 'id'
    serializer_class = UsersSerializer
"""
