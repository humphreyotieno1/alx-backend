#!/usr/bin/env python3
"""Basic flask application"""
from flask import Flask, render_template
from flask_babel import Babel

app = Flask(__name__)
app.config.from_object('Config')
babel = Babel(app)


@app.route("/")
def hello_world():
    """render html page"""
    return render_template('1-index.html')


class Config:
    """default langs"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


if __name__ == '__main__':
    app.run(debug=True)
