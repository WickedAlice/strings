"use strict";
/* Поиск гласных русских букв */
String.prototype.findVowels = function() {
	var re = /[аяоёиыэеую]+/gi;
	
	var vow = this.replace(re, '<span>$&<span>');
	
	return vow;
}


/* Поиск согласных русских букв */
String.prototype.findConsonants = function() {
	return(this.match(/[йцкнгшщзхфвпрлджчсмтб]/ig));
}

/* Подсчёт слов */
String.prototype.wordsCount = function() {

	var wo = this.replace(/[^а-яa-z]+/ig,' '); //Заменяем все не-слова на пробелы

	if (wo.match(/\s$/m)) wo = wo.slice(0,-1) ; //Если в конце оказывается пробел - его отрезаем
	
	var words = wo.split(/\s+/g);

	return words.length;
}

/* Деление слов на слоги */
/* Часть 1 - вызываем функцию "отделения слов". Параметром передаём функцию, которую она будет применять. */
String.prototype.toSyllables = function() {
	return splitSentence(wordToSyllables, this);
}

/* Поиск приставки */
/* Часть 1 - вызываем функцию "отделения слов". Параметром передаём функцию, которую она будет применять. */
String.prototype.toFindPrefix = function() {
	return splitSentence(findPrefix, this);
}

/* Отделяем слова по одному от всего остального.
	Слова отправляем в нужную функцию.
	И собираем в нужном порядке. */
function splitSentence (func, th){
	var m, w, e, i;
	var str ='';
	var th = th.toString();

	w = th.match(/[а-я]+/ig);

	e = th.match(/[^а-я]+/ig);

	var str ='';

	if (th.match(/^[а-я]+/ig))
	{ 
		for ( i = 0; i < w.length; i++  )
		{ 
			if (w[i]){str += func(w[i]);}
			if (e[i]){str += e[i];}
		}	
		return str;
	}

	else
	{
		for ( i = 0; i < e.length; i++  )
		{
			if (e[i]){str += e[i];}
			if (w[i]){str += func(w[i]);}
		}	
		return str;
	}
	
}

/* Поиск приставки */
/* Часть 2 - функция принимает одно слово и возращает его с выделенной приставкой */
function findPrefix (th) {

	var XLprefix = ['возо']

	var Lprefix = ['воз', 'вос', 'изо', 'надо', 'обо', 'обез', 'обес', 'ото', 'подо', 'предо']

	var Mprefix = ['во', 'вз', 'вс', 'вы', 'изо', 'най', 'недо', 'над', 'низо', 'об', 'от', 'под', 'пред', 'разо', 'со']

	var Sprefix = ['на', 'по', 'без', 'бес', 'в', 'до', 'за', 'из', 'ис', 'не', 'низ', 'нис', 'о', 'пере', 'пре', 'при', 'про', 'раз', 'рас', 'с', 'через', 'черес', 'чрез']

	var prefix = XLprefix.concat(Lprefix, Mprefix, Sprefix); //Сначала ищем приставки которые могут содержать в себе приставки короче


 	for ( var i = 0; i < prefix.length; i++ )
	{
		var exp = new RegExp ('^' + prefix[i] ,'i');
		if (th.match(exp) && (th.length > prefix[i].length)) return prefix[i] + '-' + (th.toString()).slice(prefix[i].length);
	}

	return th;
}

/* Деление слов на слоги */
/* Часть 2 - функция принимает одно слово и возращает его разделённым */
function wordToSyllables(th) {

	var i;

	if ((th.match(/[ауеёыоэиюя]/ig)).length == 1) return th.toString(); // Если в слове одна глассная - это и есть слог

	for( i = 0; i < th.length; i++  )
	{
		if ((th[i]).match(/[ауеёыоэиюя]/ig)) //Отрезаем слог, остальное засылаем обратно в функцию
		{ 
			if ((th[i+1]).match(/[й]/ig))  return th.slice(0, i+2) + "-" + wordToSyllables(th.slice(i+2)); // "й" всегда отходит к предидущей гласной
			else return th.slice(0, i+1) + "-" + wordToSyllables(th.slice(i+1));
		}

		if ((th[i+2]).match(/[нрлм]/ig) && (th[i+3]).match(/[йцкгшщзхфвпджчстб]/ig)) // Если после глассной идёт сонарный согласный, а за ним обычный - сонарный отходит к предидущей гласной
		{
			return th.slice(0, i+3) + "-" + wordToSyllables(th.slice(i+3));
		}
	}
}




