from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    trips = db.relationship('Trip', backref='user', lazy=True)

class Trip(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    city = db.Column(db.String(120))
    start_date = db.Column(db.String(20))
    end_date = db.Column(db.String(20))
    budget = db.Column(db.Float)
    activities = db.Column(db.JSON)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)