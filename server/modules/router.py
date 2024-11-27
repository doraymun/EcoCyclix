from services import account
from services import parking

def route(service, action, request):
    if service == "account":
        if action == "register":
            return account.register(request.json["firstName"], request.json["middleName"], request.json["lastName"], request.json["email"], request.json["password"])
        
        elif action == "login":
            return account.login(request.json["email"], request.json["password"])

        else:
            return { "code": 404, "body": "{\"error\": {\"message\": \"Service function not found.\"}}"}
    elif service == "parking":
        if action == "reserveSlot":
            return parking.reserveSlot(request.json["parkingAreaID"], request.json["parkingSlot"], request.json["userID"])
            
        else:
            return { "code": 404, "body": "{\"error\": {\"message\": \"Service function not found.\"}}"}
    else:
        return { "code": 404, "body":"{\"error\": {\"message\": \"Service function not found.\"}}"}