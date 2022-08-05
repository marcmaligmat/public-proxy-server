"""
Test for models.
"""
from unittest.mock import patch

from django.test import TestCase
from django.contrib.auth import get_user_model

from result import models


def create_user(email="user@example.com", password="test1234"):
    """Create and return a new user"""
    return get_user_model().objects.create_user(email, password)


class ModelTests(TestCase):
    """Test result models"""

    def test_create_user_with_email_successful(self):
        """Test Creating a user with an email is successful."""
        email = "test@example.com"
        password = "testpass123"
        user = get_user_model().objects.create_user(
            email=email, password=password
        )
        self.assertEqual(user.email, email)
        self.assertTrue(user.check_password(password))

    def test_new_user_email_normalized(self):
        """Test email is normalized for new users."""
        sample_emails = [
            ["test1@EXAMPLE.com", "test1@example.com"],
            ["Test2@Example.com", "Test2@example.com"],
            ["TEST3@EXAMPLE.com", "TEST3@example.com"],
            ["test4@example.COM", "test4@example.com"],
        ]

        for email, expected in sample_emails:
            user = get_user_model().objects.create_user(email, "sample123")
            self.assertEqual(user.email, expected)

    def test_new_user_without_email_raises_error(self):
        with self.assertRaises(ValueError):
            get_user_model().objects.create_user("", "pass123")

    def test_create_superuser(self):
        """Test to create superuser"""
        user = get_user_model().objects.create_superuser(
            "test@example.com", "test1234"
        )
        self.assertTrue(user.is_superuser)
        self.assertTrue(user.is_staff)

    def test_create_scraper_result(self):
        advertiser = models.Advertiser.objects.create(
            name="Advertiser name",
            fb_page="Advertiser's facebook account",
        )
        facebook_account = models.FacebookAccount.objects.create(
            email="facebook@example.com",
            password="1234444a!@!@!gh",
            phone_number="(615) 307-0833",
        )
        scraper_result = models.Result.objects.create(
            advertiser=advertiser,
            title="This is a title from sponsored ads",
            img_link="https://example.jpg",
            likes=23,
            comments=44,
            shares=55,
        )
        self.assertEqual(str(scraper_result), scraper_result.title)

    def test_create_reason(self):
        """Test Creating a reason is successful."""

        res = models.Reason.objects.create(
            reason="You are from US.",
        )
        self.assertEqual(str(res), res.reason)

    def test_create_facebook_account(self):
        """Test Creating a Facebook account model"""
        res = models.FacebookAccount.objects.create(
            email="facebook@example.com",
            password="1234444a!@!@!gh",
            phone_number="(615) 307-0833",
        )
        self.assertEqual(str(res), res.email)

    @patch("result.models.uuid.uuid4")
    def test_result_file_name_uuid(self, mock_uuid):
        """Test generating image path."""
        uuid = "test-uuid"
        mock_uuid.return_value = uuid
        file_path = models.result_image_file_path(None, "example.jpg")

        self.assertEqual(file_path, f"uploads/result/{uuid}.jpg")
