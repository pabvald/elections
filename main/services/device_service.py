from main.models import Device, Election
from .election_service import ElectionService
from .district_service import  DistrictService
from .candidature_service import CandidatureService
import datetime

class DeviceService():
    """ DeviceService class. Provides all the funcionality the Device model """


    def __init__(self, request):
        """ Identifies the device which has made a request. Creates a new Device
            model if one doesn't exists yet """

        try:
            user_id = request.session["user_id"]

        except KeyError:
            device = Device.objects.create(
                first_access = datetime.date.today(),
                last_access = datetime.date.today()
            )
            user_id = device.get_id()
            request.session["user_id"] = user_id

        # user_id contains a valid device id
        self.__device = Device.objects.get(id=user_id)

    
    @property
    def device(self):
        return self.__device
        

    def get_id(self):
        return self.__device.get_id()


    def get_default_configuration(self):
        return self.__device.get_default_min_votes_threshold()


    def get_execution_history(self):
        try:
            history = Election.objects.filter(device=self.__device)
        except:
            return []
        
        return history


    def modify_default_configuration(self, new_min_votes_threshold):
        """ Modifies the default configuration of the corresponding device """

        try:
            self.__device.set_default_min_votes_threshold(new_min_votes_threshold)
            self.__device.save()

        except:
            pass


    def add_election(self, election_data):
        """ Creates a new Election and saves it the corresponding device's history """
        
        device = self.__device 
        election_service = ElectionService()
        district_service = DistrictService()
        candidature_service = CandidatureService()
        
        election = election_service.create_election(type=election_data["type"],
                                                        date=election_data["date"],
                                                        device=device,
                                                        min_votes_threshold=election_data["configuration"]["threshold"])
       
        #Add districts
        for d in election_data["districts"]:
            district = district_service.create_district(name=d["name"],
                                                            registered_voters=d["voters"],
                                                            num_representatives=d["representatives"],
                                                            blank_votes=d["blank"],
                                                            void_votes=d["null"],
                                                            election= election)
            
            #Add candidatures
            for c in d["candidatures"]:
                candidature_service.create_candidature(abrv_name=c["abbrv"],
                                                            name=c["name"],
                                                            votes=c["votes"],
                                                            district=district)
                
        return election.get_id()