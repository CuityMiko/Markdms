// 这是主文件，请在 Html 文档中进行引用

function Markdms()
{
    // this.firstname=firstname;
    // 代码的处理
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
    this.code = code;
    function code(input)
    {
        var codeArray = input.match(/```[\s\S]*?```/g);
        var noCodeArray = input.split(/```[\s\S]*?```/g);
        if (codeArray != null){
            for (var index = 0; index < codeArray.length; index++) {
                var codefirstline = codeArray[index].match(/```.*\n/);
                var lang = codefirstline[0].replace(/```\s{0,}/,"").replace(/\s{0,}\n/,"");
                codeArray[index] = codeArray[index].replace(/```.*\n/,"```");
                codeArray[index] = codeArray[index].replace(/```([\s\S]*?)\n{0,}```/g,"$1");
                codeArray[index] = htmlEncode(codeArray[index]);
                if(lang != null && lang !=""){
                    lang = ' lang="'+lang+'"';
                }
                codeArray[index] = '<pre'+lang+'>'+codeArray[index]+'</pre>';
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