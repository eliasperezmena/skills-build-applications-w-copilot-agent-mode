from django.test import TestCase
from .models import User, Team

class UserModelTest(TestCase):
    def setUp(self):
        team = Team.objects.create(name='Marvel')
        User.objects.create(name='Spiderman', email='spiderman@marvel.com', team=team)

    def test_user_creation(self):
        user = User.objects.get(email='spiderman@marvel.com')
        self.assertEqual(user.name, 'Spiderman')
        self.assertEqual(user.team.name, 'Marvel')
