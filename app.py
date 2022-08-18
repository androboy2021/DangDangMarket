import os
from webbrowser import get
from flask import Flask, request, render_template, redirect
from flask.json import jsonify
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/local"
mongo = PyMongo(app)


@app.route('/detail')
def detail():
    market_db = mongo.db.dangdangmarket
    product =  market_db.find_one({"title": request.args.get('title')})

    return jsonify({
        'title': product.get('title'),
        'content': product.get('content'),
        'image' : product.get('image')
    })

@app.route('/writepage')
def writepage():
    return render_template('write.html')


@app.route('/write', methods=['POST'])
def write():
    market_db = mongo.db.dangdangmarket

    fileinfo = request.files['image']
    filepath = os.path.dirname(os.path.abspath(__file__)) #app.py의 폴더경로
    filepath = os.path.join(filepath, 'static') # static 폴더의 경로
    fileinfo.save(os.path.join(filepath, fileinfo.filename)) #파일의 이름 정보를 같이 넣어서 저장


    market_db.insert_one({
        'title': request.form.get('title'),
        'content': request.form.get('content'),
        'price': request.form.get('price'),
        'location': request.form.get('location'),
        'image' : fileinfo.filename
    })
    

    return redirect('/')

    
@app.route('/')
def main():
    market_db = mongo.db.dangdangmarket
    products = market_db.find()
    return render_template('list.html', products=products)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='80')

