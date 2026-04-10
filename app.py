from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Hard-coded credentials
VALID_USERNAME = "WAVES"
VALID_PASSWORD = "WAVES"
VALID_GMAIL = "ayowaves1@gmail.com"

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/greet", methods=["POST"])
def greet():
    username = request.form.get("username")
    password = request.form.get("password")
    
    if username == VALID_USERNAME and password == VALID_PASSWORD:
        # Successful login → redirect to dashboard
        return render_template("dashboard.html", username=username)
    else:
        # Failed login → back to login page
        return "<h1> Invalid username or password. Try again!</h1>"

if __name__ == "__main__":
    app.run(debug=True)