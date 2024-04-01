const fs = require('fs');
const files = 'C:/Resources/javascript/message_generator/quotes.txt';

const author = 'C:/Resources/javascript/message_generator/quotes_author.txt';
const num=[0,1,2,3,4,5,6,7,8,9]
fs.readFile(files, (err, data) => 
{
    if (err) throw err;
    fs.readFile(author, (errr, inputDD) => 
    {
        if (errr) throw errr;
        inputDD=inputDD.toString()
        let tem= inputDD.split(">")
        tem= tem.map(arr=>
            {
                for (let i=0; i <tem.length; i++){
                    tem[i]= tem[i].trim()
                }
                for (let i=0; i<arr.length; i++){
                    num.forEach(nums=>{
                        if (arr[i]==nums.toString()){
                            arr=arr.replace(arr[i],"")
                            i--;
                        }
                   })
                }  
         return arr.replace(/\s+/g, ' ');
            })
    const inputD = data.toString();
    tem = inputD.split("+");
    tem= tem.map(item=>{
        let tempp= item.split("\n")
        for (let i=0; i <tempp.length; i++){
            tempp[i]= tempp[i].trim()
        }
        item=tempp.join(" ");
        for (let i=0; i<item.length; i++){
            num.forEach(nums=>{
                if (item[i]==nums.toString()){
                    item=item.replace(item[i],"")
                    i--;
                }
           })
        }
        return item;    
    }
    )
    let index= Math.floor(Math.random()*tem.length)
    console.log(tem[index])
    });

})
