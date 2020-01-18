from django.test import TestCase
from django.core.exceptions import ValidationError
from main.models import Device
from datetime import date, timedelta

class DeviceModelTestCase(TestCase):
    """Device model's unit tests"""

    def create_device(self):
        """Creates a Device model for testing"""

        return Device.objects.create(
                            first_access = date.today(),
                            last_access = date.today()
                        )

    def test_device_creation(self):
        d = self.create_device()
        self.assertTrue(isinstance(d, Device))
        self.assertEqual(d.first_access, date.today())
        self.assertEqual(d.last_access, date.today())
      
    def test_str(self):
        d = self.create_device()
        self.assertEqual(str(d),"ID: "+str(d.id)+"\n"+ 
                                "First access: "+str(d.first_access)+"\n"+
                                "Last access: " +str(d.last_access) +"\n"+
                                "default_min_votes_threshold: " + 
                                str(d.default_min_votes_threshold) + "\n" )
    def test_get_id(self):
        d = self.create_device()
        self.assertEqual(d.get_id(), d.id)

    def test_get_first_access(self):
        d = self.create_device()
        self.assertEqual(d.get_first_access(), d.first_access)

    def test_get_last_access(self):
        d = self.create_device()
        self.assertEqual(d.get_last_access(), d.last_access)
    
    def test_get_default_min_votes_threshold(self):
        d = self.create_device()
        self.assertEqual(d.get_default_min_votes_threshold(), 
                         d.default_min_votes_threshold)

    def test_set_default_min_votes_threshold_valid(self):
        d = self.create_device()
        d.set_default_min_votes_threshold(0.0141)
        self.assertEqual(d.default_min_votes_threshold, 0.0141)

    def test_set_default_min_votes_threshold_valid_zero(self):
        d = self.create_device()
        d.set_default_min_votes_threshold(0)
        self.assertEqual(d.default_min_votes_threshold, 0)

    def test_set_default_min_votes_threshold_valid_one(self):
        d = self.create_device()
        d.set_default_min_votes_threshold(1)
        self.assertEqual(d.default_min_votes_threshold, 1)

    def test_set_default_min_votes_threshold_invalid_ltzero(self):
        d = self.create_device()
        self.assertRaises(ValueError, 
                        d.set_default_min_votes_threshold, 
                        -0.0001)
    
    def test_set_default_min_votes_threshold_invalid_gtone(self):
        d = self.create_device()
        self.assertRaises(ValueError, 
                        d.set_default_min_votes_threshold, 
                        1.0001)