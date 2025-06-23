import uuid
from django.core.exceptions import ValidationError
from django.db.models import QuerySet
from DrugStore.models import Products
from difflib import SequenceMatcher

# ************************** Product Control Views Util File**************************


def product_to_json_serializable(product: Products, request=None) -> dict:
    img_url = None
    if product.img and request:
        img_url = request.build_absolute_uri(product.img.url)
    elif product.img:
        img_url = product.img.url

    return {
        "id": product.id,
        "name": product.name,
        "description": product.description,
        "price": product.price,
        "img": img_url,
        "tags": product.tags,
        "listed": product.listed,
        "created_at": product.created_at.isoformat(),
        "updated_at": product.updated_at.isoformat(),
    }


def get_product_list() -> list[Products]:
    """Function to get a list of all products ordered by time they came out."""

    return list(Products.objects.all().order_by("-created_at"))


def get_product_by_id(product_id: uuid.UUID) -> tuple[Products | None, bool, str]:
    """Function to get a product by its ID."""

    try:
        return (
            Products.objects.get(id=product_id),
            True,
            "Product was successfully Fetched",
        )
    except Products.DoesNotExist:
        return (None, False, "Product was not found with the given ID")


def unlistNlist_product_by_id(product_id: uuid.UUID) -> tuple[bool, str]:
    """Function to unlist a product by its ID."""

    product, sucssess, message = get_product_by_id(product_id)
    if sucssess:
        product.listed = not product.listed
        product.save()
        return (
            True,
            f"Product was successfully {'listed' if product.listed else 'unlisted'}",
        )
    return False, message


def delete_product_by_id(product_id: uuid.UUID) -> tuple[bool, str]:
    """Function to delete a product by its ID."""

    product, sucssess, message = get_product_by_id(product_id)
    if sucssess:
        product.delete()
        return True, "Product was successfully deleted"
    return False, message


def add_product(product_data: dict) -> tuple[bool, str]:
    """
    Function to add a new product with validation.
    Returns a tuple: (product_instance, message)
    - product_instance will be the created Product object on success, or None on failure.
    - message will be an empty string on success, or an error message on failure.
    """
    name = product_data.get("name")
    description = product_data.get("description")
    price = product_data.get("price")
    img = product_data.get("img")
    tags = product_data.get("tags", [])

    # --- Validation Checks ---
    if not name:
        return False, "Product name is required."
    if not description:
        return False, "Product description is required."
    if price is None:
        return False, "Product price is required."

    if not isinstance(name, str) or len(name.strip()) == 0:
        return False, "Product name must be a non-empty string."
    if not isinstance(description, str) or len(description.strip()) == 0:
        return False, "Product description must be a non-empty string."

    try:
        price = float(price)
        if price < 0:
            return False, "Product price cannot be negative."
    except (ValueError, TypeError):
        return False, "Product price must be a valid number."

    if tags is not None:
        if isinstance(tags, str):
            tags = [tag.strip() for tag in tags.split(",") if tag.strip()]
        elif not isinstance(tags, list):
            return (
                False,
                "Product tags must be a list of strings or a comma-separated string.",
            )
        if not all(isinstance(tag, str) for tag in tags):
            return False, "All tags must be strings."
    else:
        tags = []

    try:
        product = Products(
            name=name,
            description=description,
            price=price,
            img=img,
            tags=tags,
            listed=True,
        )
        product.full_clean()
        product.save()
        return True, "Product was successfully added"
    except ValidationError as e:
        return False, f"Validation error: {e.message_dict}"
    except Exception as e:
        return False, f"An unexpected error occurred while adding the product: {str(e)}"


def update_product_by_id(product_id: int, product_data: dict) -> tuple[bool, str]:
    """
    Function to update an existing product with validation.
    Returns a tuple: (product_instance, message)
    - product_instance will be the updated Product object on success, or None on failure.
    - message will be an empty string on success, or an error message on failure.
    """
    product, sucssess, message = get_product_by_id(product_id)
    if not sucssess:
        return False, message

    name = product_data.get("name", product.name)
    description = product_data.get("description", product.description)
    price = product_data.get("price", product.price)
    img = product_data.get("img", product.img)
    tags = product_data.get("tags", product.tags)

    # --- Validation Checks ---

    if not name:
        return False, "Product name is required."
    if not description:
        return False, "Product description is required."
    if price is None:
        return False, "Product price is required."

    if not isinstance(name, str) or len(name.strip()) == 0:
        return False, "Product name must be a non-empty string."
    if not isinstance(description, str) or len(description.strip()) == 0:
        return False, "Product description must be a non-empty string."

    try:
        price = float(price)
        if price < 0:
            return False, "Product price cannot be negative."
    except (ValueError, TypeError):
        return False, "Product price must be a valid number."

    if tags is not None:
        if isinstance(tags, str):
            tags = [tag.strip() for tag in tags.split(",") if tag.strip()]
        elif not isinstance(tags, list):
            return (
                False,
                "Product tags must be a list of strings or a comma-separated string.",
            )
        if not all(isinstance(tag, str) for tag in tags):
            return False, "All tags must be strings."
    else:
        tags = []

    try:
        product.name = name
        product.description = description
        product.price = price
        product.img = img
        product.tags = tags
        product.full_clean()
        product.save()
        return product, "Product updated successfully"
    except ValidationError as e:
        return False, f"Validation error: {e.message_dict}"
    except Exception as e:
        return (
            False,
            f"An unexpected error occurred while updating the product: {str(e)}",
        )


def is_similar(a: str, b: str, threshold: float = 0.6) -> bool:
    return SequenceMatcher(None, a.lower(), b.lower()).ratio() >= threshold


def search_product_by_token(token: str) -> tuple[QuerySet | None, bool, str]:
    token = token.strip() if token else ""

    if len(token) < 2:
        return (
            Products.objects.none(),
            False,
            "Search term must be at least 2 characters long.",
        )

    candidates = Products.objects.filter(name__icontains=token)

    matched_products = [
        product for product in candidates if is_similar(product.name, token)
    ]

    if not matched_products:
        return (Products.objects.none(), False, "No products matched the search term.")

    ids = [p.id for p in matched_products]
    return (
        Products.objects.filter(id__in=ids),
        True,
        "Products were successfully fetched based on the search term.",
    )
