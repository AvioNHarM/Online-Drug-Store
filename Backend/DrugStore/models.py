import uuid
from django.db import models
from django.contrib.auth.hashers import make_password, check_password
from django.utils import timezone
from django.core.exceptions import ValidationError


# Create your models here.
class Accounts(models.Model):
    email = models.EmailField(max_length=254, unique=True)
    password = models.CharField(max_length=128)
    userid = models.CharField(
        max_length=100, unique=True, default=uuid.uuid4, editable=False
    )
    isAdmin = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "accounts"
        verbose_name = "Account"
        verbose_name_plural = "Accounts"

    def __str__(self):
        return f"{self.userid} ({self.email})"

    def check_password(self, raw_password):
        """Check if the provided password matches the stored hash"""
        return check_password(raw_password, self.password)

    def set_password(self, raw_password):
        """Hash and set the password"""
        self.password = make_password(raw_password)

    def save(self, *args, **kwargs):
        """Hash password if it's not already hashed , Saftey mechanism incase of manual password input"""
        if self.password and not self.password.startswith(
            ("pbkdf2_", "bcrypt", "argon2")
        ):
            self.password = make_password(self.password)
        super().save(*args, **kwargs)


class Products(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        unique=True,
    )
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.FloatField()
    img = models.ImageField(upload_to="products/", null=True, blank=True)
    tags = models.JSONField(default=list, blank=True)
    listed = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "products"
        verbose_name = "Product"
        verbose_name_plural = "Products"
        ordering = ["-created_at"]

    def __str__(self):
        return self.name

    def get_tags_display(self):
        """Return tags as a comma-separated string for display"""
        return ", ".join(self.tags) if self.tags else ""

    def set_tags(self, tags_list):
        """Set/replace all tags for the product"""
        if isinstance(tags_list, (list, tuple)):
            self.tags = list(tags_list)
        elif isinstance(tags_list, str):
            # If a string is passed, split by comma
            self.tags = [tag.strip() for tag in tags_list.split(",") if tag.strip()]
        else:
            self.tags = []
        self.save()


class Purchases(models.Model):
    # Foreign key relationships
    account = models.ForeignKey(
        "Accounts", on_delete=models.CASCADE, related_name="purchases"
    )
    product = models.ForeignKey(
        "Products", on_delete=models.CASCADE, related_name="purchases"
    )

    # Purchase details
    quantity = models.PositiveIntegerField(default=1)
    unit_price = models.FloatField()  # Price at time of purchase
    total_amount = models.FloatField()  # quantity * unit_price

    # Purchase status
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("confirmed", "Confirmed"),
        ("shipped", "Shipped"),
        ("delivered", "Delivered"),
        ("cancelled", "Cancelled"),
        ("refunded", "Refunded"),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")

    # Payment information
    PAYMENT_METHOD_CHOICES = [
        ("credit_card", "Credit Card"),
        ("debit_card", "Debit Card"),
        ("paypal", "PayPal"),
        ("bank_transfer", "Bank Transfer"),
        ("cash", "Cash"),
    ]
    payment_method = models.CharField(
        max_length=20, choices=PAYMENT_METHOD_CHOICES, null=True, blank=True
    )
    payment_status = models.CharField(
        max_length=20,
        choices=[
            ("pending", "Pending"),
            ("completed", "Completed"),
            ("failed", "Failed"),
            ("refunded", "Refunded"),
        ],
        default="pending",
    )

    # Shipping information
    shipping_address = models.TextField(null=True, blank=True)
    tracking_number = models.CharField(max_length=100, null=True, blank=True)

    # Timestamps
    time = models.DateTimeField(auto_now_add=True)  # Purchase time
    updated_at = models.DateTimeField(auto_now=True)
    shipped_at = models.DateTimeField(null=True, blank=True)
    delivered_at = models.DateTimeField(null=True, blank=True)

    # Additional purchase info
    notes = models.TextField(blank=True)  # Internal notes
    customer_notes = models.TextField(blank=True)  # Customer's special requests

    class Meta:
        db_table = "purchases"
        verbose_name = "Purchase"
        verbose_name_plural = "Purchases"
        ordering = ["-time"]  # Most recent first

    def __str__(self):
        return f"Purchase #{self.id} - {self.account.email} - {self.product.name}"

    def save(self, *args, **kwargs):
        # Auto-calculate total_amount
        if self.quantity and self.unit_price:
            self.total_amount = self.quantity * self.unit_price
        super().save(*args, **kwargs)

    def get_total_display(self):
        """Return formatted total amount"""
        return f"${self.total_amount:.2f}"

    def is_completed(self):
        """Check if purchase is completed"""
        return self.status == "delivered" and self.payment_status == "completed"

    def can_be_cancelled(self):
        """Check if purchase can be cancelled"""
        return (
            self.status in ["pending", "confirmed"]
            and self.payment_status != "completed"
        )

    def mark_as_shipped(self, tracking_number=None):
        """Mark purchase as shipped"""
        self.status = "shipped"
        self.shipped_at = timezone.now()
        if tracking_number:
            self.tracking_number = tracking_number
        self.save()

    def mark_as_delivered(self):
        """Mark purchase as delivered"""
        self.status = "delivered"
        self.delivered_at = timezone.now()
        self.save()


class UserViewHistory(models.Model):
    user = models.ForeignKey(
        Accounts, on_delete=models.CASCADE, related_name="view_history"
    )
    product = models.ForeignKey(
        Products, on_delete=models.CASCADE, related_name="view_history_entries"
    )
    viewed_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "user_view_history"
        verbose_name = "User View History"
        verbose_name_plural = "User View Histories"
        ordering = ["-viewed_at"]  # Show most recent views first
        unique_together = [
            ["user", "product"]
        ]  # Ensure a user can only have one view entry per product

    def __str__(self):
        # Format viewed_at for better readability in admin or logs
        formatted_time = (
            self.viewed_at.strftime("%Y-%m-%d %H:%M:%S") if self.viewed_at else "N/A"
        )
        user_identifier = self.user.email if self.user else "Unknown User"
        product_identifier = self.product.name if self.product else "Unknown Product"
        return f"{user_identifier} viewed {product_identifier} at {formatted_time}"


class CartItem(models.Model):
    user = models.ForeignKey(
        Accounts, on_delete=models.CASCADE, related_name="cart_items"
    )
    product = models.ForeignKey(
        Products, on_delete=models.CASCADE, related_name="cart_item_entries"
    )
    quantity = models.PositiveIntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)  # Time item was added to cart
    updated_at = models.DateTimeField(
        auto_now=True
    )  # Time item was last updated (e.g., quantity change)

    class Meta:
        db_table = "cart_items"
        verbose_name = "Cart Item"
        verbose_name_plural = "Cart Items"
        # Ensures a user has only one cart item entry per product.
        # If a user adds the same product again, the quantity should be updated.
        unique_together = [["user", "product"]]
        ordering = ["user", "-added_at"]  # Order by user, then by most recently added

    def __str__(self):
        user_email = self.user.email if self.user else "Unknown User"
        product_name = self.product.name if self.product else "Unknown Product"
        return f"{self.quantity} of {product_name} for {user_email}"

    @property
    def total_item_price(self):
        """Calculates the total price for this cart item (product price * quantity)."""
        if self.product and self.product.price is not None:
            return self.product.price * self.quantity
        return 0

    def clean(self):
        """
        Custom validation for the model.
        Ensures quantity is at least 1.
        """
        if self.quantity < 1:
            raise ValidationError({"quantity": "Quantity must be at least 1."})

    def save(self, *args, **kwargs):
        """
        Override save to auto-increment quantity if item already exists in cart.
        """
        existing = CartItem.objects.filter(user=self.user, product=self.product).first()

        if existing and not self.pk:
            # If the item already exists and this is a new instance, increment quantity
            existing.quantity += self.quantity
            existing.save()
        else:
            self.full_clean()
            super().save(*args, **kwargs)
