运算部分逻辑的文字说明：
	
	输入符号的计算逻辑：

		点击符号时调用函数operation(join, newlevel)，join为当前运算符，newlevel为当前运算符的参数（权重）；
	
		设置一个全部变量：level，初始为零，每次输入符号将当前符号的参数push进level的末尾；

			设置while条件：新输入的符号参数小于等于level的最后一位（即可以进行运算，权重不会对后面算式造成影响），就用函数（正则方式）过滤当前公式。过滤函数为parse()。

		

		关于过滤计算函数parse():

			因为上面已经说明，要计算的是权重更高的公式（乘除权重最高为6，其次加减权重5，其次左右移位运算权重4，最后按位与3、或2、非1运算），所以过滤为：

					(/^(.*\d[\+\-\*\/\%\^\&\|x\<\>])?([+-]?[0-9a-f\.]+)([\+\-\*\/\%\^\&\|x\<\>])([+-]?[0-9a-f\.]+)$/)

					$1：前面权重低不需要计算的公式返回到stack，$2为算式第一个数，$3为算式符号，$4为算式第二个数，再将$2,$3,$4传入函数cypher（left, join, right）作为参数。

						cypher()函数：

						判断$3的符号，并进行运算，将运算结果返回，同时level的最后一位slice掉。

			到这里，while的第一次循环已经结束，level的最后一位已经slice掉（进行一次运算），如果还满足while条件（连续的乘除运算），则继续进行上面的循环，直到循环结束。

		
		计算过程：

			level初始为0

			2+3    level：05
	
			2+3+   level：055（满足while条件，计算2+3）
	
			2+3*3  level：056（不满足while条件，不计算）
	
			2+3*3* level：0566（满足while条件，计算3*3）
	
			2+3*3+ level：0565 （满足while条件，计算2+3*3）

	输入括号的逻辑：

		设置全局变量level，代表括号的层数（权重级别）

		每次点击括号时level++，同时截取第level个括号后（里）的值。

	输入扩回的逻辑：

		每次点击扩回，计算当前level下的括号的值，将当前value的值写入display中，同时level--（减少一层括号）。

	输入等号的逻辑：

		运算算式，如有括号未扩回，将括号中的值优先计算，算到level为0（没有括号），再将得出的等式用过滤函数计算。在operation()函数的控制下，stack的运算最多三层，还是用parse()将stack运算。


相关函数代码：

	运算符：

		function operation(join, newlevel) {
    		// if(document.calc.display.value==="0" && document.calc.notes.value.charAt(document.calc.notes.value.length-1)=="+"){return}
   		 endNumber = true;
    		var temp = stack.substr(stack.lastIndexOf("(") + 1) + document.calc.display.value
    		while (newlevel != 0 && (newlevel <= (level.charAt(level.length - 1)))) {
       		 temp = parse(temp)
       		 level = level.slice(0, -1)
  		  }
   		 if (temp.match(/^(.*\d[\+\-\*\/\%\^\&\|x])?([+-]?[0-9a-f\.]+)$/))
        		document.calc.display.value = RegExp.$2
   		 document.calc.notes.value += join;
    		stack = stack.substr(0, stack.lastIndexOf("(") + 1) + temp + join
    		document.calc.operator.value = " " + join + " "
    		level = level + newlevel
		}

	括号：

		function addbracket() {
    		endNumber = true
   		 document.calc.display.value = 0
    		document.calc.notes.value += "("
    		stack = stack + "("
    		document.calc.operator.value = "   "
    		level = level + 0

   		 layer += 1
		}


	括回：

		function disbracket() {
 		   endNumber = true
  		  var temp = stack.substr(stack.lastIndexOf("(") + 1) + document.calc.display.value
  		  while ((level.charAt(level.length - 1)) > 0) {
     		   //验证表达式格式是否正确
   		     temp = parse(temp)
     		   level = level.slice(0, -1)
  		  }
    		document.calc.display.value = temp
    		document.calc.notes.value += ")"
    		stack = stack.substr(0, stack.lastIndexOf("("))
    		document.calc.operator.value = "   "
    		level = level.slice(0, -1)
   		 layer -= 1

	}

	等号(计算)：

		function result() {
   		 endNumber = true
   		 while (layer > 0)
        		disbracket()
    		temp = stack + document.calc.display.value
    		while ((level.charAt(level.length - 1)) > 0) {
        
        		temp = parse(temp)
        		level = level.slice(0, -1)
   		 }
    		document.calc.display.value = temp
    		document.calc.operator.value = ""
    		document.calc.notes.value = ""
    		stack = ""
    		level = "0"
		}


	过滤后的计算函数：

		function cypher(left, join, right) {
   		 left = todec(left, carry)
    		right = todec(right, carry)
    		if (join == "+")
        		return (decto(parseFloat(left) + parseFloat(right), carry))
   		 if (join == "-")
        		return (decto(left - right, carry))
   		 if (join == "*")
   		     return (decto(left * right, carry))
   		 if (join == "/" && right != 0)
   		     return (decto(left / right, carry))
   		 if (join == "%")
   		     return (decto(left % right, carry))
   		 if (join == "&")
   		     return (decto(left & right, carry))
  		  if (join == "|")
  		      return (decto(left | right, carry))
    		if (join == "^")
    		    return (decto(Math.pow(left, right), carry))
   		 if (join == "x")
     		   return (decto(left ^ right, carry))
    		if (join == "<")
    		    return (decto(left << right, carry))
   		 if (join == ">")
    		    return (decto(left >> right, carry))
  		  alert("除数不能为零")
  		  return (left)
		}












