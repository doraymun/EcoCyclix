from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema  # Import directly from marshmallow_sqlalchemy
from flask_migrate import Migrate
from sqlalchemy import text
from werkzeug.security import generate_password_hash, check_password_hash

# Initialize Flask app and configurations
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost:3306/ecocyclix'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  
app.config['SQLALCHEMY_ECHO'] = True

# Initialize extensions
db = SQLAlchemy(app)
ma = Marshmallow(app)
migrate = Migrate(app, db)

# User model
class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(254), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False) 

    def set_password(self, password):
        self.password = generate_password_hash(password) 

    def check_password(self, password):
        return check_password_hash(self.password, password)  

# User schema
class UserSchema(SQLAlchemyAutoSchema):  # Change to use SQLAlchemyAutoSchema directly
    class Meta:
        model = User
        load_instance = True

user_schema = UserSchema()
users_schema = UserSchema(many=True)

@app.route('/')
def home():
    return "Welcome to the Bike Carousel Access Control System"

@app.route('/test_db', methods=['GET'])
def test_db():
    try:
        result = db.session.execute(text("SELECT 1"))
        return {"message": "Database connection successful", "result": [row[0] for row in result]}, 200
    except Exception as e:
        db.session.rollback()
        return {"message": "Database connection failed", "error": str(e)}, 500

@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        new_user = User(name=name, email=email)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()
        return {"message": "User created successfully"}, 201
    except Exception as e:
        db.session.rollback()
        print("Error:", e)
        return {"message": "Failed to create user"}, 500

@app.errorhandler(500)
def internal_error(error):
    return "500 Error: Internal Server Error", 500

if __name__ == '__main__':
    app.run(debug=True)
