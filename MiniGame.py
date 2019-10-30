from flask import Flask, render_template, request, session #first we import the required packages
from flask_assets import Environment, Bundle
import numpy as np
import mysql.connector

app = Flask(__name__)   #We create run the flask app
assets = Environment(app)

myHost = "localhost"     #These parameters are set when you build your database
myUser = "root"          #This is where you have to put your info
myPassword = "Password"
myDatabase = "game_db"

css = Bundle('css/styles.css', filters='cssmin', output='temp/main.css')
js = Bundle(
    "js/Collision.js",
    'js/tears.js',
    'js/player.js', 
    'js/commands.js',
    "js/monsters.js",
    'js/levels.js', 
    "js/doors.js",
    'js/gameMode.js',
    'js/game.js', 
    'js/index.js', 
    filters='jsmin', output='temp/main.js')

assets.register('css_all', css);
assets.register('js_all', js)

defaultPlayer = {
    'ID' : "",
    'Attack': 5,
    'MaxSpeed': 15, 
    'FireRate': 2,
    'Range': 50,
    'ShotSpeed': 35
}

levelStatistics = {
    'level': 0,
    'time': 0,
    'tearsShot': 0,
    'tearsHit': 0,
    'distance': 0,
    'success': 0
}

numberOfLevels = 2;

def insertData(table, dataPoints):    #add an entry in database
    mydb = mysql.connector.connect(
    host=myHost,   
    user=myUser,       
    passwd=myPassword,
    database=myDatabase,
    auth_plugin='mysql_native_password'
    )
    
    mycursor = mydb.cursor()
    
    SQLCommand = "INSERT INTO "+ table +" VALUES("  #This time we used string formatting to make the command rather than a loop because we always want the same number of values to be entered
    
    for var in range(len(dataPoints)):    #this will place the variables we want into the command
        SQLCommand += dataPoints[var]
        if(var < len(dataPoints) - 1):
            SQLCommand += ', '

    SQLCommand += ")"

    mycursor.execute(SQLCommand)
    mydb.commit()                   #we sent and execute the insert command to the db
    
    mydb.close()

def fetchData(table, variables, condition):
    mydb = mysql.connector.connect( #first we open the connection with the sql database
    host=myHost,   
    user=myUser,       
    passwd=myPassword,
    database=myDatabase,
    auth_plugin='mysql_native_password'
    )

    SQLCommand = "SELECT "

    for var in range(len(variables)):    #this will place the variables we want into the command
        SQLCommand += variables[var]
        if(var < len(variables) - 1):
            SQLCommand += ', '
        else:
            SQLCommand += ' '

    SQLCommand += "FROM " + table

    if len(condition) != 0:
        SQLCommand += " WHERE " + condition[0] 

    mycursor = mydb.cursor()    
    mycursor.execute(SQLCommand)    #we sent the command to the server
    data = np.array(mycursor.fetchall()).T  #we read the response and translate it to have array per variable
    mydb.close()    #We close the connection with the db
    
    return data

pastPlayers = fetchData('Players', ['player_id','name'], []).tolist()
pastWinners = fetchData('Players', ['name'], ["won = 'True'"])[0].tolist()

@app.route("/", methods=['GET', 'POST'])      #this is where you specify the path and methods to run the app
def miniGame():
    if request.method == 'POST':
        defaultPlayer['ID'] = request.form.get('playerID')
        defaultPlayer['Attack'] = request.form.get('attack')
        defaultPlayer['MaxSpeed'] = request.form.get('maxSpeed')
        defaultPlayer['FireRate'] = request.form.get('fireRate')
        defaultPlayer['Range'] = request.form.get('range')
        defaultPlayer['ShotSpeed'] = request.form.get('shotSpeed')

        for i in range(1,numberOfLevels+1) :
            lvl = str(i)
            levelStatistics = {
                'level': request.form.get('level' + lvl),
                'time': request.form.get('time' + lvl),
                'tearsShot': request.form.get('tearsShot' + lvl),
                'tearsHit': request.form.get('tearsHit' + lvl),
                'distance': request.form.get('distanceTravelled' + lvl),
                'success': request.form.get('success' + lvl)
            }
    else :
        defaultPlayer['ID'] = ""
    return render_template('index.html', playerDefault=defaultPlayer, nLevels=numberOfLevels, pastWinners=pastWinners) #pulls files to display info thru browser


#debug mode by running script directly and not flask run
if __name__ == '__main__':
    app.run(debug=True)


