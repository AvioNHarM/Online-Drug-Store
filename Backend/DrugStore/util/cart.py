from DrugStore.models import Accounts, CartItem, Products


def handle_add_to_cart(userid: str, product_id: int, quantity: int) -> tuple[bool, str]:
    """
    Handle adding a product to the user's cart.
    """
    if not userid or not product_id:
        return False, "userid and product_id required"

    if quantity < 1:
        return False, "Quantity must be at least 1"

    user = Accounts.objects.filter(userid=userid).first()
    product = Products.objects.filter(id=product_id).first()

    if not user or not product:
        return False, "Invalid user or product"

    cart_item, created = CartItem.objects.get_or_create(user=user, product=product)

    if not created:
        cart_item.quantity += quantity
    else:
        cart_item.quantity = quantity

    cart_item.save()

    return True, "Product added to cart successfully"


def handle_remove_from_cart(userid: str, product_id: int) -> tuple[bool, str]:
    """
    Handle adding a product to the user's cart.
    """
    if not userid or not product_id:
        return False, "userid and product_id required"

    user = Accounts.objects.filter(userid=userid).first()
    product = Products.objects.filter(id=product_id).first()

    if not user or not product:
        return False, "Invalid user or product"

    cart_item = CartItem.objects.filter(user=user, product=product).first()
    if not cart_item:
        return False, "Item not found in cart"

    cart_item.delete()

    return True, "Item removed from cart"


def handle_list_cart_items(userid: str) -> tuple[list[CartItem], bool, str]:
    """
    Handle listing all cart items for a user.
    """

    if not userid:
        return [], False, "userid required"

    user = Accounts.objects.filter(userid=userid).first()
    if not user:
        return [], False, "User not found"

    cart_items = CartItem.objects.filter(user=user)

    items = []
    for item in cart_items:
        items.append(
            {
                "product_id": item.product.id,
                "quantity": item.quantity,
            }
        )

    return items, True, "Cart items retrieved successfully"


def handle_update_cart_item(
    userid: str, product_id: int, quantity: int
) -> tuple[bool, str]:
    """
    Handle updating the quantity of a cart item for a user.
    """
    if not userid or not product_id:
        return False, "userid and product_id required"

    if quantity < 1:
        return False, "Quantity must be at least 1"

    user = Accounts.objects.filter(userid=userid).first()
    product = Products.objects.filter(id=product_id).first()

    if not user or not product:
        return False, "Invalid user or product"

    cart_item = CartItem.objects.filter(user=user, product=product).first()
    if not cart_item:
        return False, "Item not found in cart"

    cart_item.quantity = quantity
    cart_item.save()

    return True, "Cart item updated successfully"
