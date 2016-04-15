#! /usr/bin/env node


//dependencia
var readlineSync = require('readline-sync');
var math = require('mathjs');
var fs = require('fs');

var users = JSON.parse(fs.readFileSync('./parameters/users.json', 'utf8'));

var name;
var op = 1;

var auth = false;

var user_name = users.user_name;
var user_senha = users.user_senha;

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

function randomIntInc (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

function getQuestionUnblock(){
    var operators = ['+','-','*','/'];
    var coin  = randomIntInc(0,3);
    var operand1 = randomIntInc(1,10).toString();
    var operand2 = randomIntInc(1,10).toString();
    var expression = operand1+' '+operators[coin]+' '+operand2;

    return {
        'question':'Qual o valor da expressao: '+expression,
        'answer': math.eval(expression)
    };
}

var login = (function(readlineSync){
    console.log(user_name);
    console.log(user_senha);
		var user = readlineSync.question('Digite seu login?');
		var senha = readlineSync.question('Digite sua senha ', {hideEchoBack: true});

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
		doBloqueio();
	}
}

function doBloqueio(){
	bloqueio = true;
	console.log('Sua conta foi temporariamente bloqueada');

	conta = 0;
    clear();
}

function doDesbloqueio(){

    var question = getQuestionUnblock();
    console.log(question.question);
    var answer = readlineSync.question('Para desbloquear seu perfil responda a pergunta:');

    if(answer == question.answer){
        console.log('Resposta correta');
        bloqueio = false;
        console.log('Usuario desbloqueado');
    }else{
        console.log('Resposta incorreta');
    }
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

function getName(readlineSync){
	var n = readlineSync.question('DIGITE UM NOVO LOGIN: ');
	console.log('OK O LOGIN '+user_name+' FOI ALTERADO PARA ' + n + '.');
	return n;
}

function getPassword(readlineSync){
	var n = readlineSync.question('DIGITE UMA NOVA SENHA: ', {hideEchoBack: true});
	console.log('OK SENHA ALTERADA COM SUCESSO!');
	return n;
}

function configUser(){
    clear();
    console.log('********** CONFIGURADOR DE USUARIO ***********');
    console.log('');
    console.log('CONFIGURANDO LOGIN...');
    user_name = getName(readlineSync);
    console.log('LOGIN CONFIGURADO!');

    console.log('CONFIGURANDO SENHA...');
    user_senha = getPassword(readlineSync);
    console.log('SENHA CONFIGURADA!');

    var new_user = {
        user_name:user_name,
        user_senha:user_senha
    };
    //console.log(JSON.stringify(new_user));
    fs.writeFile("./parameters/users.json", JSON.stringify(new_user)+"", function(err) {
        if (err) throw err;
    });
}

function execute(readlineSync){
    console.log('Implement not yet...');
}



function doMenu(readlineSync){
	do{
        //clear();
		op = menuPrincipal(readlineSync);
		//console.log('type: %s and value: %d',typeof op,op);
		switch(op){
			case 0:
                clear();
				console.log('Bye...');

				break;
			case 1:
                configUser();

				break;
			case 2:
                execute(readlineSync);
				break;
		}
	
	}while(op != 0)

}

function doLogin(readlineSync){

	do{	

		if (!bloqueio){
            clear();
			auth = login(readlineSync); 
			if (auth){
				
				clear();
				doMenu(readlineSync);		

			}
			
		}else{
            clear();
            console.log('Voce esta temporariamente bloqueado!');
            var options = ['DESBLOQUEAR'];

            var choosed = readlineSync.keyInSelect(options, 'ESCOLHA UMA OPCAO',{cancel: 'VOLTAR AO MENU PRINCIPAL'});

            if(choosed+1 == 1){
                doDesbloqueio();
            }


		}
		
	}while(auth == false && bloqueio == false) 

}

function doMenuInicial(readlineSync) {

	var escolha = 0;
	
	do{

		escolha = menuInicial(readlineSync);
		
		 if (escolha == 1){

		 		doLogin(readlineSync);
		 }

	
	}while(escolha == 1)

	boot = false;
}

function run(readlineSync){

	do{
		doMenuInicial(readlineSync);
	}while(boot == true)
}
clear();
run(readlineSync);
clear();
process.exit();

