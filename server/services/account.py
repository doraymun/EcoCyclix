from datetime import datetime
from modules import db_connection
from mysql.connector import Error

cnx = db_connection.connectToDb()

def register(firstName, middleName, lastName, email, password):
    try:
        cursor = cnx.cursor(buffered=True)

        query = ("SELECT ID FROM users "
                 "WHERE Email=%s")
        data = (email,)

        cursor.execute(query, data)

        if cursor.rowcount > 1:
            response = { "code": 404, "body": ("{ \"error\": {\"message\": \"Email is already registered.\"} }")}

        else:
            query = ("INSERT INTO users"
                    "(FirstName, MiddleName, LastName, Email, Password, Created, Creator)"
                    "VALUES(%s, %s, %s, %s, %s, %s, 1)")
            data =  (firstName, middleName, lastName, email, password, datetime.now())

            cursor.execute(query, data)

            cnx.commit()

            cursor.close()

            response = { "code": 200, "body": "{\"message\": \"User successfully signed up.\"}"}

    except Error as err:
        response = { "code": 404, "body": ("{ \"error\": {\"message\": \"", err.msg, "\"} }")}

    
    return response

def login(email, password):
    try:
        cnx._open_connection()
        cursor = cnx.cursor(buffered=True)
        query = ("SELECT ID, FirstName, MiddleName, LastName, Email FROM users "
                 "WHERE Email=%s AND Password=%s")
        data = (email, password)

        cursor.execute(query, data)

        if cursor.rowcount > 0:
            for (resultset) in cursor:
                response = { "code": 200, "body": ("{ \"id\": " + str(resultset[0]) + ", \"firstName\": \"" + str(resultset[1]) + "\", \"middleName\": \"" + str(resultset[2]) + "\", \"lastName\": \"" + str(resultset[3]) + "\", \"email\": \"" + str(resultset[4]) + "\" }")}
        else:
            response = { "code": 401, "body": ("{\"error\": { \"message\": \"Invalid email or password.\" }}")}

        cursor.close()

    except Error as err:
        response = { "code": 404, "body": ("{ \"error\": {\"message\": \"", err.msg, "\"} }")}

    return response