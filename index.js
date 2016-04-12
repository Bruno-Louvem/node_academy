#! /usr/bin/env node


//dependencia
var readlineSync = require('readline-sync');

var name;
var op = 1;

var auth = false;

var user_name = 'app'; 
var user_senha = 1234;

var boot = true;

var conta = 0;

var bloqueio = false;
//Exemplo de question user
// Wait for user's response. 
//var userName = readlineSync.question('May I have your name? :');
//console.log('Hi ' + userName + '!');


function clear() {
  process.stdout.write('\u001B[2J\u001B[0;0f');
}

var login = (function(readlineSync){
		
		
		var user = readlineSync.question('May have your user name?');

		var senha = readlineSync.question('Password ', {hideEchoBack: true});	


		return validationLogin(user, senha);	



});

function validationLogin(user, senha){

	var auth = (user == user_name && senha == user_senha);
		
		if (!auth){

			somarContador();
			console.log('Usuario ou senha invalido')
		}

	 return auth;

}

function somarContador(){

	conta ++;

	verificaContador();
}

function verificaContador(){

	if (conta == 3) {

		bloqueio = true;
		console.log('Sua conta foi temporariamente bloqueada');
		doDesbloqueio();
	}
}

function doDesbloqueio(){
		console.log('Contagem de desbloqueio iniciada');
	setTimeout(function(){
	 	bloqueio = false; 
	 	console.log ('Desbloqueado');
		}, 6000);



}

var menuInicial = (function(readlineSync){

	var options = ['LOGIN'];

	var choosed = readlineSync.keyInSelect(options, 'ESCOLHA UMA OPCAO',{cancel: 'SAIR'});
		
	return choosed+1;

});

var menuPrincipal = (function(readlineSync){
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


function doMenu(){
	do{
		op = menuPrincipal(readlineSync);
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

}

function doLogin(){
	
	do{	

		if (!bloqueio){

			auth = login(readlineSync); 
			if (auth){
				
				clear();
				doMenu();		

			}
			
		}else{

			console.log('Voce esta temporariamente bloqueado!');
		}
	}while(auth == false && bloqueio == false) 



}

function doMenuInicial() {

	var escolha = 0;
	
	do{

		escolha = menuInicial(readlineSync);
		
		 if (escolha == 1){

		 		doLogin();
		 }

	
	}while(escolha == 1)

	boot = false;
}

function run(readlineSync){

	do{
		doMenuInicial();
		

	}while(boot == true)
}

run(readlineSync);

process.exit();

