from flask import Flask, render_template, request, jsonify
import qrcode
import qrcode.image.svg
from io import BytesIO
import base64

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate():
    data = request.get_json()
    url = data['url']

    # Generate PNG QR code
    qr = qrcode.QRCode(version=1, error_correction=qrcode.constants.ERROR_CORRECT_L, box_size=10, border=4)
    qr.add_data(url)
    qr.make(fit=True)
    img = qr.make_image(fill='black', back_color='white')
    buffer_png = BytesIO()
    img.save(buffer_png, 'PNG')
    buffer_png.seek(0)
    png_base64 = base64.b64encode(buffer_png.getvalue()).decode()

    # Generate SVG QR code
    factory = qrcode.image.svg.SvgImage
    buffer_svg = BytesIO()
    img_svg = qrcode.make(url, image_factory=factory)
    img_svg.save(buffer_svg)
    buffer_svg.seek(0)
    svg_base64 = base64.b64encode(buffer_svg.getvalue()).decode()

    return jsonify(png=png_base64, svg=svg_base64)

if __name__ == '__main__':
    app.run(debug=True)
    