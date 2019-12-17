from flask import Flask, render_template, request, session, url_for, redirect #first we import the required packages
from flask_assets import Environment, Bundle
from datetime import datetime
import numpy as np
import mysql.connector

app = Flask(__name__)   #We create run the flask app
assets = Environment(app)

myHost = "Host"     #These parameters are set when you build your database
myUser = "User"          #This is where you have to put your info
myPassword = "password"
myDatabase = "db"

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

def insertData(table, dataPoints):    #add an entry in database
    mydb = mysql.connector.connect(
    host=myHost,   
    user=myUser,       
    passwd=myPassword,
    database=myDatabase,
    auth_plugin='mysql_native_password'
    )
    
    mycursor = mydb.cursor()
    
    SQLCommand = "INSERT INTO "+ table +" VALUES('"  #This time we used string formatting to make the command rather than a loop because we always want the same number of values to be entered
    
    for var in range(len(dataPoints)):    #this will place the variables we want into the command
        SQLCommand += str(dataPoints[var])
        if(var < len(dataPoints) - 1):
            SQLCommand += "', '"

    SQLCommand += "')"

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

def editPlayerData(id):
    mydb = mysql.connector.connect( #first we open the connection with the sql database
    host=myHost,   
    user=myUser,       
    passwd=myPassword,
    database=myDatabase,
    auth_plugin='mysql_native_password'
    )

    SQLCommand = "UPDATE Players SET won = 'True' WHERE player_id = " + id 
    
    mycursor = mydb.cursor()    
    mycursor.execute(SQLCommand)    #we sent the command to the server
    mydb.commit()
    mydb.close()    #We close the connection with the db

@app.route("/")
def defaultPage():

    return redirect(url_for('login'))

@app.route("/login", methods=['GET', 'POST'])
def login():
    message = ''
    playerLogin = fetchData('Players', ['name', 'motDePasse', 'player_id','admin', 'won'],[]).tolist()

    if request.method == 'POST':    #checks if data is being loaded
        if request.form.get('PlayerLoginName') != None: #if user attemps to login
            playerName = request.form.get('PlayerLoginName')    #store username
            if playerName in playerLogin[0]:    # Checks if username is valid
                playerIndex = playerLogin[0].index(playerName)  #gets index of player
                if  playerLogin[1][playerIndex] == request.form.get('PlayerLoginPassword'): #checks if password matches
                    return redirect(url_for('miniGame', userName=playerName))
                else:
                    message = "Incorrect password for " + playerName
            else:
                message = playerName + " cannot be found in database" 

        elif request.form.get('PlayerName') != None:    #if user attemps to sign up
            newPlayerName = request.form.get('PlayerName')  #store new user name
            if newPlayerName in playerLogin[0]: #checks if user name is free
                message = "Sorry this UserName is already being used"
            else:                               #if userName taken
                newPassword = request.form.get('PlayerPassword')
                playerExp = request.form.get('PlayerExp')
                if newPassword == "" or playerExp == "" or newPlayerName == "":
                    message = "Please fill all fields to proceed"
                else:
                    newPlayerID = len(playerLogin[0]) + 1
                    newPlayerExp = request.form.get('PlayerExp')
                    newPlayerWon = 'False'
                    newPlayerAdmin = 'False'
                    insertData('Players', [newPlayerID, newPlayerName, newPassword, newPlayerExp, newPlayerWon, newPlayerAdmin])
                    return redirect(url_for('miniGame', userName=newPlayerName))

    return render_template('login.html', message = message)

@app.route("/bindingOfCasper/<string:userName>", methods=['GET', 'POST'])      #this is where you specify the path and methods to run the app
def miniGame(userName):

    playerLogin = fetchData('Players', ['name', 'motDePasse', 'player_id','admin', 'won'],[]).tolist()
    playerIndex = playerLogin[0].index(userName)
    user = {
        'Name': userName, 
        'player_id': playerLogin[2][playerIndex], 
        'won': playerLogin[4][playerIndex],
        'admin': playerLogin[3][playerIndex]
        }

    if request.method == 'POST':
        level_key = len(fetchData('Levels', ['level_id'],[])[0])+1
        game_key = len(fetchData('Games', ['game_id'],[])[0])+1 #generate the primary key to store data in sql

        insertData('Games', 
            [game_key, user['player_id'], 
            request.form.get('attack'), 
            request.form.get('speed'), 
            request.form.get('fireRate'), 
            request.form.get('range'), 
            request.form.get('shotSpeed'), 
            str(datetime.now()),
            request.form.get('phone')
            ])   #this default stats are unchanged so far

        for i in range(int(len(request.form)/6)-1):
            lvl = str(i+1)
            info = [
                    level_key,
                    game_key,
                    request.form.get('level' + lvl), 
                    request.form.get('time' + lvl),
                    request.form.get('tearsShot' + lvl), 
                    request.form.get('tearsHit' + lvl),
                    request.form.get('distanceTravelled' + lvl), 
                    request.form.get('success' + lvl)
                ]
            level_key += 1
            insertData('Levels', info)
        
        if info[7] == 'true':
            editPlayerData(user['player_id'])   #if user wins we edits his entry

    return render_template('index.html', user=user) #pulls files to display info thru browser


#debug mode by running script directly and not flask run
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=80)
