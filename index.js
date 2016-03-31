#! /usr/bin/env node


//dependencia
var readlineSync = require('readline-sync');

var name;
var op = 1;

//Exemplo de question user
// Wait for user's response. 
//var userName = readlineSync.question('May I have your name? :');
//console.log('Hi ' + userName + '!');


function clear() {
  process.stdout.write('\u001B[2J\u001B[0;0f');
}

var menu = (function(readlineSync){
	var options = ['CONFIGURACOES', 'EXECUTAR'];
	
	var choosed = readlineSync.keyInSelect(options, 'ESCOLHA UMA OPCAO',{cancel: 'SAIR'});
		
	return choosed+1;
	
});

var getName = (function(readlineSync){
	var n = readlineSync.question('May I have your name? :');
	console.log('OK i save your name,' + n + '.');
	return n;
});

var execute = (function(readlineSync){
	
});

clear();

do{
	clear();
	op = menu(readlineSync);
	//console.log('type: %s and value: %d',typeof op,op);
	switch(op){
		case 0:
			console.log('Bye...');
			break;
		case 1:
			name = getName(readlineSync);
			break;
		case 2:
			console.log('Implement not yet...');
			break;
	}
	
}while(op != 0)

	

process.exit();

