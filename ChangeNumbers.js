/**
*
* @Name : ChangeNumbers.js
* @Version : 1.0
* @Programmer : Max
* @Date : 2018-06-24
* @Released under : https://github.com/BaseMax/ChangeNumbersJs/blob/master/LICENSE
* @Repository : https://github.com/BaseMax/ChangeNumbersJs
*
**/
;(function(window,document)
{
	"use strict";
	/**
	* @variable persian
	*
	* @goal : Change Position of scroll
	*
	* @return string[]
	**/
	var persian = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
	/**
	* @variable arabic
	*
	* @goal : Change Position of scroll
	*
	* @return string[]
	**/
	var arabic = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
	/**
	* @variable english
	*
	* @goal : Change Position of scroll
	*
	* @return string[]
	**/
	var english = ['0','1','2','3','4','5','6','7','8','9'];
	/**
	* @function replaceAll
	*
	* @goal : Replace All
	*
	* @return string
	**/
	var replaceAll = function(input,str1, str2, ignore)
	{
		return input.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
	}
	/**
	* @function check_from
	*
	* @goal : Change value of the argument from a language to another language.
	*
	* @return string
	**/
	var check_from=function(value,from,target)
	{
		if(
			from == "fa"   || from == "pa" || from == "en"   || from == "ar"   ||
			target == "fa" || target == "pa" || target == "en" || target == "ar"
		)
		{
			var numbers,numbers1;
			////////////////////////
			if(from == "fa")
				numbers1=persian;
			else if(from == "pa")
				numbers1=persian;
			else if(from == "ar")
				numbers1=arabic;
			else if(from == "en")
				numbers1=english;
			////////////////////////
			if(target == "fa")
				numbers=persian;
			else if(target == "pa")
				numbers=persian;
			else if(target == "ar")
				numbers=arabic;
			else if(target == "en")
				numbers=english;
			////////////////////////
			for(var i=0;i<numbers.length;i++)
			{
				value = replaceAll(value,numbers1[i],numbers[i]);
			}
		}
		return value;
	};
	/**
	* @function check
	*
	* @goal : Change value of the argument to another language.
	*
	* @return string
	**/
	var check=function(value,target)
	{
		if(target == "fa" || target == "pa")
		{
			value=check_from(value,"ar",target);
			value=check_from(value,"en",target);
		}
		else if(target == "ar")
		{
			value=check_from(value,"fa",target);
			value=check_from(value,"en",target);
		}
		else if(target == "en")
		{
			value=check_from(value,"fa",target);
			value=check_from(value,"ar",target);
		}
		return value;
	};
	/**
	* @function do
	*
	* @goal : Change value of the argument to another language
	*
	* @return void
	**/
	var checks=function(element,target)
	{
		var value=element.innerHTML;
		if(element.hasAttribute("data-number-from") && element.getAttribute("data-number-from") != "auto")
		{
			var from 	= element.getAttribute("data-number-from");
			value=check_from(value,from,target);
		}
		else
		{
			value=check(value,target);
		}
		element.innerHTML=value;
	};
	/**
	* @struct numbers
	*
	* @goal : access to public functions
	*
	* @return struct
	**/
	window.numbers=
	{
		//////////////////////
		checks:checks,
		//////////////////////
		check:check,
		check_from:check_from,
		//////////////////////
		persian:persian,
		arabic:arabic,
		english:english,
		//////////////////////
	};
	/**
	* @struct onload
	*
	* @goal : set onclick and events after page load...
	*
	* @return void
	**/
	window.addEventListener("load",function()
	{
		var data_items;
		data_items = document.querySelectorAll("[data-number-target=fa]");
		data_items.forEach(function(item)
		{
			window.numbers.checks(this,"fa");
		});
		//////////////////////////////////////////////////////////////////
		data_items = document.querySelectorAll("[data-number-target=en]");
		data_items.forEach(function(item)
		{
			window.numbers.checks(this,"en");
		});
		//////////////////////////////////////////////////////////////////
		data_items = document.querySelectorAll("[data-number-target=ar]");
		data_items.forEach(function(item)
		{
			window.numbers.checks(this,"ar");
		});
		//////////////////////////////////////////////////////////////////
	},false);
}(window,document));
