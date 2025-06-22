from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User, Trip
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tripmate.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')

db.init_app(app)
jwt = JWTManager(app)

with app.app_context():
    db.create_all()

# Registro
@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    if User.query.filter_by(username=data['username']).first():
        return jsonify({"msg": "Usuario ya existe"}), 400
    hashed_pw = generate_password_hash(data['password'])
    user = User(username=data['username'], password=hashed_pw)
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "Usuario creado"}), 201

# Login
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data['username']).first()
    if user and check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token, username=user.username)
    return jsonify({"msg": "Credenciales incorrectas"}), 401

# Obtener perfil
@app.route('/api/profile', methods=['GET'])
@jwt_required()
def profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify(username=user.username)

# CRUD de viajes (asociados al usuario)
@app.route('/api/trips', methods=['GET', 'POST'])
@jwt_required()
def trips():
    user_id = get_jwt_identity()
    if request.method == 'GET':
        trips = Trip.query.filter_by(user_id=user_id).all()
        return jsonify([{
            "id": t.id,
            "title": t.title,
            "city": t.city,
            "start_date": t.start_date,
            "end_date": t.end_date,
            "budget": t.budget,
            "activities": t.activities or []
        } for t in trips])
    if request.method == 'POST':
        data = request.json
        trip = Trip(
            title=data['title'],
            city=data.get('city'),
            start_date=data.get('startDate'),
            end_date=data.get('endDate'),
            budget=data.get('budget'),
            activities=data.get('activities', []),
            user_id=user_id
        )
        db.session.add(trip)
        db.session.commit()
        return jsonify({"msg": "Viaje creado"}), 201

@app.route('/api/trips/<int:trip_id>', methods=['PUT', 'DELETE'])
@jwt_required()
def trip_detail(trip_id):
    user_id = get_jwt_identity()
    trip = Trip.query.filter_by(id=trip_id, user_id=user_id).first_or_404()
    if request.method == 'PUT':
        data = request.json
        trip.title = data.get('title', trip.title)
        trip.city = data.get('city', trip.city)
        trip.start_date = data.get('startDate', trip.start_date)
        trip.end_date = data.get('endDate', trip.end_date)
        trip.budget = data.get('budget', trip.budget)
        trip.activities = data.get('activities', trip.activities)
        db.session.commit()
        return jsonify({"msg": "Viaje actualizado"})
    if request.method == 'DELETE':
        db.session.delete(trip)
        db.session.commit()
        return jsonify({"msg": "Viaje eliminado"})

@app.route("/")
def home():
    return "¡API TripMate funcionando!"

if __name__ == "__main__":
    app.run(debug=True)