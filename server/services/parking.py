from datetime import datetime
from modules import db_connection
from mysql.connector import Error
import time

cnx = db_connection.connectToDb()

def reserveSlot(parkingAreaID, slotNumber, userID):
    try:
        cursor = cnx.cursor(buffered=True)

        query = ("INSERT INTO transactions"
                "(ParkingAreaID, SlotNumber, Created, Creator)"
                "VALUES(%s, %s, %s, %s)")
        data =  (parkingAreaID, slotNumber, time.strftime('%Y-%m-%d %H:%M:%S'), userID)

        cursor.execute(query, data)

        cnx.commit()

        cursor.close()

        response = { "code": 200, "body": "{\"message\": \"Parking Slot successfully reserved.\"}"}

    except Error as err:
        response = { "code": 404, "body": ("{ \"error\": {\"message\": \"", err.msg, "\"} }")}

    return response

# def retrieveParkingSlots():
#     try:


#     except Error as err:
#         response = { "code": 404, "body": ("{ \"error\": {\"message\": \"", err.msg, "\"} }")}

#     return response