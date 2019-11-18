# -*- coding: utf-8 -*-
"""
    Calculator
    ~~~~~~~~~~~~~~

    A simple Calculator made by Flask and jQuery.

    :copyright: (c) 2015 by Grey li.
    :license: MIT, see LICENSE for more details.
"""
import re
from flask import Flask, jsonify, render_template, request


app = Flask(__name__)


@app.route('/_calculate')
def calculate():
    a = request.args.get('number1', '0')
    operator = request.args.get('operator', '+')
    b = request.args.get('number2', '0')
    # validate the input data
    m = re.match(r'^\-?\d*[.]?\d*$', a)
    n = re.match(r'^\-?\d*[.]?\d*$', b)

    if m is None or n is None or operator not in '+-*/':
        return jsonify(result='Error!')

    if operator == '/':
        result = eval(a + operator + str(float(b)))
    else:
        result = eval(a + operator + b)
    return jsonify(result=result)


@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
