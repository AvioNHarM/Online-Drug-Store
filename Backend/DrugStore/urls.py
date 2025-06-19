from django.urls import path
from . import views

urlpatterns = [
    # Product Control
    path("products/", views.list_products, name="list_products"),
    path("products/search/", views.search_product, name="search_product"),
    path("products/unlistNlist/", views.unlistNlist_product, name="unlistNlist"),
    path("products/delete/", views.delete_product, name="delete_product"),
    path("products/add/", views.add_product_view, name="add_product"),
    path("products/update/", views.update_product, name="update_product"),
    path("products/get/", views.get_product, name="get_product"),
    # Authentication
    path("auth/login/", views.login, name="login"),
    path("auth/logout/", views.logout, name="logout"),
    path("auth/register/", views.register, name="register"),
    path("auth/is_admin/", views.is_admin, name="is_admin"),
    # Cart Control
    path("cart/add/", views.add_to_cart, name="add_to_cart"),
    path("cart/remove/", views.remove_from_cart, name="remove_from_cart"),
    path("cart/list/", views.list_cart, name="list_cart"),
    path(
        "cart/update_quantity/", views.update_cart_quantity, name="update_cart_quantity"
    ),
    # History Control
    path("history/list/", views.list_history, name="list_history"),
    path("history/add/", views.add_to_history, name="add_to_history"),
    # Payment Control
    path("payment/initiate/", views.initiate_payment, name="initiate_payment"),
    path("payment/confirm/", views.confirm_payment, name="confirm_payment"),
    path("payment/cancel/", views.cancel_payment, name="cancel_payment"),
    path("payment/status/", views.get_payment_status, name="get_payment_status"),
    # AI Control
    path("ai/product_matcher/", views.ai_product_matcher, name="ai_product_matcher"),
]
