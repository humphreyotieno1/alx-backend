#!/usr/bin/env python3
"""flask app"""
from flask import Flask, render_template
from flask_babel import Babel


app = Flask(__name__)
app.config.from_object('Config')
babel = Babel(app)


@app.route('/')
def single():
    """renders a single html helloworld"""
    return render_template('1-index.html')


class Config:
    """default languages"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


if __name__ == '__main__':
    app.run(debug=True)
