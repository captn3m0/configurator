Configurator is a config manager library for Javascript. It uses localStorage to store persistent configurations in the browser.

##Setup

Include configurator.js in your html

`<script src="configurator.js"></script>`

Now, create a config object. The function takes two parameters :

1. default: Object holding default configuration values
2. persistent: Array of key strings for persistent configuration.

```
var config= Configurator({sound:true,autoPlay:false,volume:60},['volume']);

//volume property will persist even after refreshes using localstorage.

//Set additional configuration options

config.set("shuffle",true,true);
```

.set takes three parameters:

1. Key Name
2. Value
3. Persistent (true/false)

```
var shuffleState = config.get('shuffle');
//Will get the value of the config option.
```

###Localstorage clearing
Since configurator stores the persistent config information in localstorage, you cannot clear localstorage using localStorage.clear any more. Instead use `config.clearLS()` function to clear the localStorage. It will clear localstorage, and write the persistent config keys back into localStorage.

#Licence
Licenced under MIT Licence. Feel free to fork/use.

Configurator is extracted from [SDSLabs Muzi](https://sdslabs.co.in/muzi), a music player application for the IIT-Roorkee Campus.