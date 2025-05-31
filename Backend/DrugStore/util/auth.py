from ..models import Accounts


def handle_register(email: str, password: str) -> tuple[Accounts, bool, str]:
    """
    Handle user registration.
    """

    if not email or not password:
        return None, False, "Email and password required"

    if not email or "@" not in email or "." not in email.split("@")[-1]:
        return None, False, "Invalid email format"

    if Accounts.objects.filter(email=email).exists():
        return None, False, "Email already registered"

    account = Accounts(email=email)
    account.set_password(password)
    account.save()

    return account, True, "Registration successful"


def handle_login(email: str, password: str) -> tuple[Accounts | None, bool, str]:
    """
    Handle user logging in.
    """
    if not email or not password:
        return None, False, "Email and password required"

    account = Accounts.objects.filter(email=email).first()
    if not account:
        return None, False, "email does not exist"

    if not account.check_password(password):
        return None, False, "Invalid  password"

    return account, True, "Login successful"


def handle_admin(userid: str) -> tuple[bool, str]:
    """
    Handle checking if the user is an admin.
    """
    if not userid:
        return False, "User ID required"

    account = Accounts.objects.filter(userid=userid).first()
    if not account:
        return False, "User does not exist"

    if not account.is_admin:
        return False, "User is not an admin"

    return True, "User is an admin"


def handle_get_user_info(userid: str) -> tuple[dict | None, bool, str]:
    """
    Handle retrieving user info based on userid.
    """
    if not userid:
        return None, False, "User ID required"

    account = Accounts.objects.filter(userid=userid).first()
    if not account:
        return None, False, "User not found"

    user_info = {
        "userid": account.userid,
        "email": account.email,
        "isAdmin": account.is_admin,
        "created_at": account.created_at.isoformat(),
        "updated_at": account.updated_at.isoformat(),
    }

    return user_info, True, "User info retrieved successfully"
