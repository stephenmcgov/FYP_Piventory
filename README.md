# FYP_Piventory
FYP Stock System

install nodejs:

* For Windows:
```https://nodejs.org/en/download/```

* For Linux/Raspbian:

Check ARM version:
```uname -m```

Pull tar based on ARM ver:
```wget <link-address>```

Extract Archive (```-xfz``` for gz, ```-xJf``` for xz)
```tar <option> <pulled-filename>```

Copy Node to /usr/local
```cd <extracted-filepath>```
```sudo cp -R * /usr/local/```

///

Confirm node installed in terminal:
```node -v```
```npm -v```

clone repo in chosen location via https:
```git clone https://github.com/stephenmcgov/FYP_Piventory.git```

install dependencies to project folder, uses nodemon and express packages, misc middleware
```cd FYP_Piventory```
```npm install```

start app service
```npm start```

app available on localhost:8080 by default with options for broadcast servers

Admin login is ```Username:owner``` | ```Password:casa0wn3r```
Staff login ```Username:staff``` | ```Password:c454staff```
