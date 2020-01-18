from django.test import TestCase
from main.models import ElectionType

class ElectionTypeModelTestCase(TestCase):
    """Candidature model's unit tests"""

    def create_election_type(self, name="local"):
        """Creates an ElectionType model for testing """
        return ElectionType.objects.create(name=name)

    def test_str(self):
        t = self.create_election_type()
        self.assertEqual(str(t), t.name)

    def test_get_id(self):
        t = self.create_election_type()
        self.assertEqual(t.get_id(), t.id)
    
    def test_get_name(self):
        t = self.create_election_type()
        self.assertEqual(t.get_name(), t.name)

    