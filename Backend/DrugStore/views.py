import json
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import uuid


from DrugStore.models import Accounts, Products
from DrugStore.util.general import error_response
from DrugStore.util.history import (
    handle_add_to_history,
    handle_list_user_view_history,
)
from DrugStore.util.product import (
    add_product,
    delete_product_by_id,
    get_product_by_id,
    get_product_list,
    product_to_json_serializable,
    search_product_by_token,
    unlistNlist_product_by_id,
    update_product_by_id,
)
from DrugStore.util.auth import (
    handle_register,
    handle_login,
    handle_admin,
    handle_get_user_info,
)
from DrugStore.util.cart import (
    handle_add_to_cart,
    handle_remove_from_cart,
    handle_list_cart_items,
    handle_update_cart_item,
)

# Create your views here.

# * Product Control Views


def list_products(request) -> JsonResponse:
    """
    View to list all products, serialized to JSON.

    Expects:
        -   No parameters.
    Returns:
        -   JsonResponse with a list of products and HTTP status 200.
    """

    products = get_product_list()
    serialized_products = [
        product_to_json_serializable(product) for product in products
    ]
    return JsonResponse(serialized_products, safe=False, status=200)


def get_product(request) -> JsonResponse:
    """
    View to get details of a specific product.

    Expects query parameters:
        - ?id=<product_id>

    Returns:

        -   JsonResponse with the product data and status 200 if found, or error JsonResponse with status 400 or 404.
    """

    try:
        product_id = uuid.UUID(request.GET.get("id", None))
    except (TypeError, ValueError):
        return error_response("Invalid or missing product ID", status=400)

    product, sucssess, message = get_product_by_id(product_id)

    if sucssess:
        return JsonResponse(
            product_to_json_serializable(product, request=request),
            safe=False,
            status=200,
        )

    return error_response(message, status=404)


# todo fix search algo
def search_product(request) -> JsonResponse:
    """
    View to search products by name.

    Expects query parameters:
        -   ?search_token=<token>

    Returns:
        -   JsonResponse with a list of matching products and status 200 if found,
        -   or error JsonResponse with status 400 or 404.
    """

    try:
        product_token = request.GET.get("search_token", None)
    except (TypeError, ValueError):
        return error_response("Invalid or missing search token", status=400)

    products, sucssess, message = search_product_by_token(product_token)

    if sucssess:
        serialized_products = [
            product_to_json_serializable(product) for product in products
        ]
        return JsonResponse(serialized_products, safe=False, status=200)

    return error_response(message, status=404)


@csrf_exempt
def unlistNlist_product(request) -> JsonResponse:
    """
    View to toggle a product's listing status (listed/unlisted).

    Expects JSON body:
        {
            "id": "<product_id>",
            "userid": "<admin_user_id>"
        }

    Returns:
        - JsonResponse with success message and status 200,
        - or error JsonResponse with status 400 or 403 or 404.
    """
    if request.method != "POST":
        return error_response("Only POST method allowed", status=405)

    try:
        data = json.loads(request.body)
        product_id = uuid.UUID(data.get("id"))
        userid = data.get("userid")
    except (TypeError, ValueError, json.JSONDecodeError, AttributeError):
        return error_response("Invalid or missing parameters", status=400)

    is_admin, message = handle_admin(userid)
    if not is_admin:
        return error_response("Unauthorized: Admin access required", status=403)

    success, message = unlistNlist_product_by_id(product_id)
    if success:
        return JsonResponse({"message": message}, status=200)

    return error_response(message, status=404)


@csrf_exempt
def delete_product(request) -> JsonResponse:
    """
    View to delete a product.

    Expects JSON body:
        {
            "id": "<product_id>",
            "userid": "<admin_user_id>"
        }

    Returns:
        - JsonResponse with success message and status 200,
        - or error JsonResponse with status 400 or 403 or 404.
    """
    if request.method != "POST":
        return error_response("Only POST method allowed", status=405)

    try:
        data = json.loads(request.body)
        product_id = uuid.UUID(data.get("id"))
        userid = data.get("userid")
    except (TypeError, ValueError, json.JSONDecodeError, AttributeError):
        return error_response("Invalid or missing parameters", status=400)

    is_admin, message = handle_admin(userid)
    if not is_admin:
        return error_response("Unauthorized: Admin access required", status=403)

    success, message = delete_product_by_id(product_id)
    if success:
        return JsonResponse({"message": message}, status=200)

    return error_response(message, status=404)


@csrf_exempt
def add_product_view(request) -> JsonResponse:
    """
    View to add a new product.

    Expects multipart form data:
        - name: <str>
        - price: <float>
        - description: <str>
        - tags: <comma-separated str>
        - img: <file>
        - userid: <admin_user_id>

    Returns:
        - JsonResponse with success message and status 201 if added,
        - or error JsonResponse with status 400 or 403.
    """
    if request.method != "POST":
        return error_response("Only POST method allowed", status=405)

    if not request.content_type.startswith("multipart/form-data"):
        return error_response("Expected multipart form data", status=400)

    product_data = request.POST
    image_file = request.FILES.get("img")

    userid = product_data.get("userid")
    is_admin, message = handle_admin(userid)
    if not is_admin:
        return error_response("Unauthorized: Admin access required", status=403)

    data = {
        "name": product_data.get("name"),
        "price": product_data.get("price"),
        "description": product_data.get("description"),
        "tags": product_data.get("tags", ""),
        "img": image_file,
    }

    success, message = add_product(data)
    if success:
        return JsonResponse({"message": message}, status=201)

    return error_response(message, status=400)


@csrf_exempt
def update_product(request) -> JsonResponse:
    """
    View to update an existing product.

    Expects JSON body:
        {
            "id": "<product_id>",
            "userid": "<admin_user_id>",
            "product": {
                "name": "<str>",
                "price": <float>,
                "description": "<str>",
                "img": "<url or null>",
                "tags": [<str> or comma-separated string]
            }
        }

    Returns:
        - JsonResponse with success message and status 200 if updated,
        - or error JsonResponse with status 400 or 403.
    """
    if request.method != "POST":
        return error_response("Only POST method allowed", status=405)

    try:
        data = json.loads(request.body)
        product_id = uuid.UUID(data.get("id"))
        userid = data.get("userid")
        product_data = data.get("product", {})
    except (json.JSONDecodeError, TypeError, ValueError, AttributeError):
        return error_response("Invalid JSON or missing parameters", status=400)

    is_admin, message = handle_admin(userid)
    if not is_admin:
        return error_response("Unauthorized: Admin access required", status=403)

    success, message = update_product_by_id(product_id, product_data)
    if success:
        return JsonResponse({"message": "Product updated successfully"}, status=200)

    return error_response(message, status=400)


# * Authentication Views


@csrf_exempt
def register(request) -> JsonResponse:
    """
    View to handle user registration.

    Expects JSON body:
    {
        "email": "<user_email>",
        "password": "<user_password>"
    }

    Returns:
        -   JsonResponse with user ID and success message and status 201 if created,
        -   or error JsonResponse with status 400.
    """

    if request.method != "POST":
        return error_response("Only POST method allowed", status=405)

    try:
        data = json.loads(request.body)
        email = data.get("email")
        password = data.get("password")

        account, success, message = handle_register(email, password)

        if not success:
            return error_response(message, status=400)

        user_data = {
            "id": account.userid,
            "email": account.email,
            "name": account.email.split("@")[0],
        }

        return JsonResponse({"message": message, "user": user_data}, status=201)

    except json.JSONDecodeError:
        return error_response("Invalid JSON", status=400)


@csrf_exempt
def login(request) -> JsonResponse:
    """
    View to handle user login.

    Expects JSON body:
    {
        "email": "<user_email>",
        "password": "<user_password>"
    }

    Returns:
        -   JsonResponse with user ID and success message and status 200 if successful,
        -   or error JsonResponse with status 400.
    """

    if request.method != "POST":
        return error_response("Only POST method allowed", status=405)

    try:
        data = json.loads(request.body)
        email = data.get("email")
        password = data.get("password")

        account, success, message = handle_login(email, password)

        if not success:
            return error_response(message, status=400)

        user_data = {
            "id": account.userid,
            "email": account.email,
            "name": account.email.split("@")[0],
        }

        return JsonResponse({"message": message, "user": user_data}, status=200)

    except json.JSONDecodeError:
        return error_response("Invalid JSON", status=400)


@csrf_exempt
def is_admin(request) -> JsonResponse:
    """
    View to check if the user is an admin.

    Expects JSON body:
    {
        "userid": "<user_id>"
    }

    Returns:
        -   JsonResponse with admin status and message and status 200,
        -   or error JsonResponse with status 400.
    """

    if request.method != "POST":
        return error_response("Only POST method allowed", status=405)

    try:
        data = json.loads(request.body)
        userid = data.get("userid")

        success, message = handle_admin(userid)

        if not success:
            return error_response(message, status=400)

        return JsonResponse({"message": message, "is_admin": success}, status=200)

    except json.JSONDecodeError:
        return error_response("Invalid JSON", status=400)


@csrf_exempt
def get_user_info(request) -> JsonResponse:
    """
    View to retrieve user info based on userid.

    Expects JSON body:
    {
        "userid": "<user_id>"
    }

    Returns:
        -   JsonResponse with user data and message and status 200,
        -   or error JsonResponse with status 400.
    """

    if request.method != "POST":
        return error_response("Only POST method allowed", status=405)

    try:
        data = json.loads(request.body)
        userid = data.get("userid")

        user_data, success, message = handle_get_user_info(userid)

        if not success:
            return error_response(message, status=400)

        return JsonResponse({"message": message, "user_data": user_data}, status=200)

    except json.JSONDecodeError:
        return error_response(status=400)


# * Cart Control Views
@csrf_exempt
def add_to_cart(request) -> JsonResponse:
    """
    View to add product to cart.

    Expects JSON body:
    {
        "userid": "<user_id>",
        "product_id": <product_id>,
        "quantity": <int>
    }
    Returns:
        -   JsonResponse with success message and status 200,
        -   or error JsonResponse with status 400.
    """

    if request.method != "POST":
        return error_response("Only POST method allowed", status=405)

    try:
        data = json.loads(request.body)
        userid = data.get("userid")
        product_id = data.get("product_id")
        quantity = int(data.get("quantity", 1))

        success, message = handle_add_to_cart(userid, product_id, quantity)

        if not success:
            return error_response(message, status=400)

        return JsonResponse(
            {
                "message": message,
            },
            status=200,
        )

    except json.JSONDecodeError:
        return error_response("Invalid JSON", status=400)


@csrf_exempt
def remove_from_cart(request) -> JsonResponse:
    """
    View to remove product from cart.

    Expects JSON body:
    {
        "userid": "<user_id>",
        "product_id": <product_id>
    }

    Returns:
        -   JsonResponse with success message and status 200,
        -   or error JsonResponse with status 400.
    """

    if request.method != "POST":
        return error_response("Only POST method allowed", status=405)

    try:
        data = json.loads(request.body)
        userid = data.get("userid")
        product_id = data.get("product_id")

        success, message = handle_remove_from_cart(userid, product_id)

        if not success:
            return error_response(message, status=400)

        return JsonResponse(
            {
                "message": message,
            },
            status=200,
        )

    except json.JSONDecodeError:
        return error_response("Invalid JSON", status=400)


@csrf_exempt
def list_cart(request) -> JsonResponse:
    """
    View to list all products in the cart for a user.

    Expects JSON body:
    {
        "userid": "<user_id>"
    }

    Returns:
        -   JsonResponse with list of cart items and status 200,
        -   or error JsonResponse with status 400.
    """

    if request.method != "POST":
        return error_response("Only POST method allowed", status=405)

    try:
        data = json.loads(request.body)
        userid = data.get("userid")

        items, success, message = handle_list_cart_items(userid)
        if not success:
            return error_response(message, status=400)

        return JsonResponse({"message": message, "cart": items}, status=200)

    except json.JSONDecodeError:
        return error_response("Invalid JSON", status=400)


@csrf_exempt
def update_cart_quantity(request) -> JsonResponse:
    """
    View to update quantity of a cart item.

    Expects JSON body:
    {
        "userid": "<user_id>",
        "product_id": <product_id>,
        "quantity": <int>
    }

    Returns:
        -   JsonResponse with success message and status 200,
        -   or error JsonResponse with status 400.
    """

    if request.method != "POST":
        return error_response("Only POST method allowed", status=405)

    try:
        data = json.loads(request.body)
        userid = data.get("userid")
        product_id = data.get("product_id")
        quantity = int(data.get("quantity"))

        success, message = handle_update_cart_item(userid, product_id, quantity)

        if not success:
            return error_response(message, status=400)

        return JsonResponse(
            {"message": message},
            status=200,
        )

    except json.JSONDecodeError:
        return error_response("Invalid JSON", status=400)


# * History Control Views


@csrf_exempt
def list_history(request) -> JsonResponse:
    """
    View to list all products in the history for a user.

    Expects JSON body:
    {
        "userid": "<user_id>"
    }

    Returns:
        -   JsonResponse with list of viewed products and status 200 if successful,
        -   or error JsonResponse with status 400 or 405.
    """

    if request.method != "POST":
        return error_response("Only POST method allowed", status=405)

    try:
        data = json.loads(request.body)
        userid = data.get("userid")

        items, success, message = handle_list_user_view_history(userid)
        if not success:
            return error_response(message, status=400)

        return JsonResponse({"message": message, "history": items}, status=200)

    except json.JSONDecodeError:
        return error_response("Invalid JSON", status=400)


@csrf_exempt
def add_to_history(request) -> JsonResponse:
    """
    View to add a product to a user's history.

    Expects a POST request with JSON payload containing:
        - 'userid': the ID of the user
        - 'product_id': the ID of the product to add to history

    Returns:
        - 200 OK with a success message if the product is added successfully.
        - 400 Bad Request with an error message if input is invalid or the action fails.
        - 405 Method Not Allowed if the request is not a POST.
    """

    if request.method != "POST":
        return error_response("Only POST method allowed", status=405)

    try:
        data = json.loads(request.body)
        userid = data.get("userid")
        product_id = data.get("product_id")

        success, message = handle_add_to_history(userid, product_id)

        if not success:
            return error_response(message, status=400)

        return JsonResponse(
            {
                "message": message,
            },
            status=200,
        )

    except json.JSONDecodeError:
        return error_response("Invalid JSON", status=400)


# * Payment Control Views
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


# *AI Control Views
def ai_product_matcher(request) -> JsonResponse:
    """
    View to match products using AI.
    """

    pass
