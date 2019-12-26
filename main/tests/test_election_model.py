from django.test import TestCase
from django.core.exceptions import ValidationError
from main.models import Election, ElectionType, Device
from datetime import date, timedelta

class ElectionModelTestCase(TestCase):
    """Election model's unit tests"""

    def create_election(self, type="Local", date=date.today(), min_votes_threshold=0.03):
        """Creates a District model for testing"""
        device = Device.objects.create(
                            first_access = date.today(),
                            last_access = date.today()
                        )
        election_type = ElectionType.objects.create(name=type)
        return Election.objects.create(
                                    type=election_type,
                                    date=date,
                                    min_votes_threshold=min_votes_threshold,
                                    device=device                                    
                                )        


    def test_election_creation(self):
        yesterday = date.today() - timedelta(days=1)
        e = self.create_election(type="Congress", date=yesterday, 
                                            min_votes_threshold=0.09)
        self.assertTrue(isinstance(e, Election))
        self.assertEqual(e.date, yesterday)
        self.assertEqual(e.min_votes_threshold, 0.09)
        election_type = e.type 
        self.assertTrue(isinstance(election_type, ElectionType))
        self.assertEqual(election_type.name, "Congress")
      

    def test_min_votes_threshold_valid(self):
        e = self.create_election(min_votes_threshold=0.09)
        self.assertTrue(isinstance(e, Election))
        self.assertEqual(e.min_votes_threshold, 0.09)


    def test_min_votes_threshold_valid_zero(self):
        e = self.create_election(min_votes_threshold=0.0)
        self.assertTrue(isinstance(e, Election))
        self.assertEqual(e.min_votes_threshold, 0.0)
    

    def test_min_votes_threshold_valid_one(self):
        e = self.create_election(min_votes_threshold=1)
        self.assertTrue(isinstance(e, Election))
        self.assertEqual(e.min_votes_threshold, 1)
    

    def test_min_votes_threshold_invalid_negative(self):
        self.fail("TODO ")


    def test_min_votes_threshold_invalid_positive(self):
        self.fail("TODO ")


    def test_str(self):
        e = self.create_election()
        self.assertEqual(str(e),"Date: " + str(e.date) + "\n" +  
                                "Min_votes_threshold: " + str(e.min_votes_threshold) + "\n" + 
                                "Type: " + str(e.type) + "\n" + 
                                "Device: " + str(e.device))   

    def test_get_id(self):
        e = self.create_election()
        self.assertEqual(e.get_id(), e.id)
    

    def test_get_date(self):
        e = self.create_election()
        self.assertEqual(e.get_date(), e.date)
    

    def test_get_min_votes_threshold(self):
        e = self.create_election()
        self.assertEqual(e.get_min_votes_threshold(), e.min_votes_threshold)
    

    def test_get_type(self):
        e = self.create_election()
        self.assertEqual(e.get_type(), e.type.get_name())
    

    def test_get_device_id(self):
        e = self.create_election()
        self.assertEqual(e.get_device_id(), e.device)
            