from datetime import timezone
from Backend.DrugStore.models import Accounts, Products, UserViewHistory


def handle_list_user_view_history(
    userid: str,
) -> tuple[list[UserViewHistory], bool, str]:
    """
    Handle listing all user's view history items a user.
    """

    if not userid:
        return [], False, "userid required"

    user = Accounts.objects.filter(userid=userid).first()
    if not user:
        return [], False, "User not found"

    history = UserViewHistory.objects.filter(user=user)

    items = []

    for item in history:
        items.append(
            {
                "product_id": item.product.id,
            }
        )

    return items, True, "User's view history retrieved successfully"


def handle_add_to_history(userid: str, product_id: int) -> tuple[bool, str]:
    """
    Handle adding a product to the user's view history.
    """
    if not userid or not product_id:
        return False, "userid and product_id required"

    user = Accounts.objects.filter(userid=userid).first()
    if not user:
        return False, "User not found"

    product = Products.objects.filter(id=product_id).first()
    if not product:
        return False, "Product not found"

    history_entry = UserViewHistory.objects.filter(user=user, product=product).first()

    if history_entry:
        history_entry.viewed_at = timezone.now()
        history_entry.save()
    else:
        UserViewHistory.objects.create(user=user, product=product)

    return True, "Product added to user's view history successfully"
