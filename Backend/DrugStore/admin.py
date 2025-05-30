from django.contrib import admin
from .models import Accounts, Products, Purchases, UserViewHistory, CartItem

# Register your models here.
admin.site.register(Accounts)
admin.site.register(Products)
admin.site.register(Purchases)
admin.site.register(UserViewHistory)
admin.site.register(CartItem)