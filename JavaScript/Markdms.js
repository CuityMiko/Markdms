// 这是主文件，请在 Html 文档中进行引用

function Markdms()
{
    // this.firstname=firstname;
    // -------- 代码的处理 --------
    // 下面的函数可以将代码中的特殊字符替换为实体符号
    function htmlEncode(str){
        var i,s={
            "&amp;": /&/g,
            "&quot;": /"/g,
            "&apos;": /'/g,
            "&lt;": /</g,
            "&gt;": />/g,
            "<br>": /\n/g,
            "&nbsp;": / /g,
            "&nbsp;&nbsp;&nbsp;&nbsp;": /\t/g
        };
        for(i in s){
            str=str.replace(s[i],i);
        }
        return str;
    }
    // 代码高亮函数，此处只做简单的处理，如果需要高级的处理和自行引入代码高亮插件
    this.codehighlight = codehighlight;
    function codehighlight(code,lang) {
        code = htmlEncode(code);
        if(lang != null && lang !=""){
            lang = ' lang="'+lang+'"';
        }
        code = '<pre'+lang+'>'+code+'</pre>';
        return code
    }
    // 定义代码处理方法
    this.code = code;
    function code(input)
    {
        // 获取所有的代码块，存入数组 codeArray
        var codeArray = input.match(/\n```[\s\S]*?```[\s]{0,}[$\n]/g);
        // 获取所有的非代码块，存入数组 noCodeArray
        var noCodeArray = input.split(/\n```[\s\S]*?```[\s]{0,}[$\n]/g);
        // 假如说存在代码块，则对代码会进行相应的处理
        if (codeArray != null){
            for (var index = 0; index < codeArray.length; index++) {
                // 获取语言设置
                var codefirstline = codeArray[index].match(/\n```.*\n/);
                var lang = codefirstline[0].replace(/\n```\s{0,}/,"").replace(/\s{0,}\n/,"");
                // 获取代码块中的代码
                codeArray[index] = codeArray[index].replace(/\n```.*\n([\s\S]*?)\n```[\s]{0,}[$\n]/g,"$1");
                // 调用代码高亮函数
                codeArray[index] = this.codehighlight(codeArray[index],lang);
            }
        }
        // 准备处理所有的行内代码
        var Reginlincode3 = new RegExp(/```\s{0,}.*\s{0,}```/);
        var Reginlincode2 = new RegExp(/``\s{0,}.*\s{0,}``/);
        var Reginlincode1 = new RegExp(/`\s{0,}.*\s{0,}`/);
        for (var index = 0; index < noCodeArray.length; index++) {
            // 获取所有的代码块，存入数组 codeArray
            var inlincodeArray = noCodeArray[index].match(/(```.*```|``.*``|`.*`)/g);
            // 获取所有的非代码块，存入数组 noCodeArray
            var noinlineCodeArray = noCodeArray[index].split(/(```.*```|``.*``|`.*`)/g);
            if (inlincodeArray != null){
                for (var i = 0; i < inlincodeArray.length; i++) {
                    if(Reginlincode3.test(inlincodeArray[i])){
                        inlincodeArray[i] = inlincodeArray[i].replace(/```\s{0,}(.*)\s{0,}```/,"$1");
                    }else if(Reginlincode2.test(inlincodeArray[i])){
                        inlincodeArray[i] = inlincodeArray[i].replace(/``\s{0,}(.*)\s{0,}``/,"$1");
                    }else if(Reginlincode2.test(inlincodeArray[i])){
                        inlincodeArray[i] = inlincodeArray[i].replace(/`\s{0,}(.*)\s{0,}`/,"$1");
                    }
                    inlincodeArray[i] = '<code>'+htmlEncode(inlincodeArray[i])+'</code>';
                }
            }
            noCodeArray[index] = "";
            for (var i = 0; i < noinlineCodeArray.length; i++) {
                console.log(noinlineCodeArray[i]);
                if((i+1)<noinlineCodeArray.length){
                    noCodeArray[index] += noinlineCodeArray[i]+inlincodeArray[i];
                }else{
                    noCodeArray[index] += noinlineCodeArray[i];
                }
            }
        }
        // 合并字符串并输出
        this.output = "";
        for (var index = 0; index < noCodeArray.length; index++) {
            if((index+1)<noCodeArray.length){
                this.output += noCodeArray[index]+codeArray[index];
            }else{
                this.output += noCodeArray[index];
            }
        }
        return this.output;
    }
    
    // 段落的处理
    this.paragraph=paragraph;
    function paragraph(input)
    {
        this.output = input.replace(/(.*)\n\n/g,"<p>$1</p>");
        
        return this.output;
    }
    
    // Markdown 文档转换为 Html 代码的方法
    this.Mark2html = Mark2html;
    function Mark2html(input){
        return this.code(input);
    }
}