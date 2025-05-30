import json
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from Backend.DrugStore.models import Products
from Backend.DrugStore.util.general import error_response
from Backend.DrugStore.util.product import add_product, delete_product_by_id, get_product_by_id, get_product_list, product_to_json_serializable, search_product_by_token, unlist_product_by_id, update_product_by_id

# Create your views here.

#* Product Control Views

def list_products(request) -> JsonResponse:
    """
    View to list all products, serialized to JSON.
    """
    products = get_product_list()
    serialized_products = [product_to_json_serializable(product) for product in products]
    return JsonResponse(serialized_products, safe=False , status=200)

def get_product(request) -> JsonResponse:
    """
    View to get details of a specific product.
    """
    try:
        product_id = int(request.GET.get('id', None))
    except (TypeError, ValueError):
        return error_response("Invalid or missing product ID", status=400)

    
    product , sucssess , message = get_product_by_id(product_id)
    
    if sucssess:
        return JsonResponse(product_to_json_serializable(product), safe=False , status=200)
    
    return error_response(message, status=404)

def search_product(request) -> JsonResponse:
    """
    View to search products by name.
    """
    
    try:
        product_token = request.GET.get('search_token', None)
    except (TypeError, ValueError):
        return error_response('Invalid or missing search token', status=400)

    
    products , sucssess , message = search_product_by_token(product_token)
    
    if sucssess:
        serialized_products = [product_to_json_serializable(product) for product in products]
        return JsonResponse(serialized_products, safe=False , status=200)
    
    return error_response(message, status=404)

def unlist_product(request) -> JsonResponse:
    """
    View to unlist a product.
    """
    try:
        product_id = int(request.GET.get('id', None))
    except (TypeError, ValueError):
        return error_response('Invalid or missing product ID', status=400)

    success , message = unlist_product_by_id(product_id)

    if success:
        return JsonResponse({'message': message}, status=200)

    return error_response(message, status=404)

def delete_product(request) -> JsonResponse:
    """
    View to delete a product.
    """
    try:
        product_id = int(request.GET.get('id', None))
    except (TypeError, ValueError):
        return error_response('Invalid or missing product ID', status=400)

    success, message = delete_product_by_id(product_id)

    if success:
        return JsonResponse({'message': message}, status=200)

    return error_response(message, status=404)

@csrf_exempt
def add_product_view(request) -> JsonResponse:
    """
    View to add a product.
    """
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST requests allowed'}, status=405)

    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return error_response('Invalid JSON', status=400)

    success, message = add_product(data.get('product', {}))

    if success:
        return JsonResponse({'message': message}, status=201)

    return error_response(message, status=400)

@csrf_exempt
def update_product(request) -> JsonResponse:
    """
    View to update product.
    """
    
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST requests allowed'}, status=405)

    try:
        data = json.loads(request.body)
        product_id = int(data.get('id'))
        product_data = data.get('product', {})
    except (json.JSONDecodeError, TypeError, ValueError):
        return error_response('Invalid JSON or missing ID', status=400)

    success, message = update_product_by_id(product_id, product_data)

    if success:
        return JsonResponse({'message': "Product updated successfully"}, status=200)

    return error_response(message, status=400)


#* Authentication Views
def login(request) -> JsonResponse:
    """
    View to handle user login.
    """
    
    pass

def logout(request) -> JsonResponse:
    """
    View to handle user logout.
    """
    
    pass

def register(request) -> JsonResponse:
    """
    View to handle user registration.
    """
    
    pass

def is_admin(request) -> JsonResponse:
    """
    View to check if the user is an admin.
    """
    
    pass

#* Cart Control Views
def add_to_cart(request) -> JsonResponse:
    """
    View to add product to cart.
    """
    
    pass

def remove_from_cart(request) -> JsonResponse:
    """
    View to remove product from cart.
    """
    
    pass

def list_cart(request) -> JsonResponse:
    """
    View to list all products in the cart.
    """
    
    pass


#* History Control Views
def list_history(request) -> JsonResponse:
    """
    View to list all products in the history.
    """
    
    pass

def add_to_history(request) -> JsonResponse:
    """
    View to add product to history.
    """
    
    pass

#* Payment Control Views
def initiate_payment(request) -> JsonResponse:
    """
    View to initiate payment.
    """
    
    pass

def confirm_payment(request) -> JsonResponse:
    """
    View to confirm payment.
    """
    
    pass

def cancel_payment(request) -> JsonResponse:
    """
    View to cancel payment.
    """
    
    pass

def get_payment_status(request) -> JsonResponse:
    """
    View to get the status of a payment.
    """
    
    pass

#*AI Control Views
def ai_product_matcher(request) -> JsonResponse:
    """
    View to match products using AI.
    """
    
    pass