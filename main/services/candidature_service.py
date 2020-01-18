from main.models import Candidature 

class CandidatureService():
    """ CandidatureService class. Provides all the functionality related to the 
        Candidature model """ 
        
    def create_candidature(self, abrv_name, name, votes, district):
        """ Creates a new Candidature and saves it into the database """
        candidature = Candidature(abrv_name=abrv_name,
                                          name=name,
                                          votes=votes,
                                          district=district)
        candidature.save()
        return candidature