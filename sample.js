
// 1 st qusetion
function  stringReverse(str){
    console.log(str.length)
    let str2="";
    for(let i=str.length-1;i>=0;i--){
      str2+=str[i]    
    }
    return str2
}
let str="codecode"
console.log(stringReverse(str))
  
// 2 nd question
function checkPrimeNumber(num){
    if(num<=1){
        return false
    }
    if(num===2){
        return true
    }
    for(let i=2;i<=Math.sqrt(num);i++){
        if(num%1===0){
            return false
        }
    }
    return true
}
let num1=3
console.log(checkPrimeNumber(num1))
let num2=4
console.log(checkPrimeNumber(num2))

// 3 rd question
function largestNumber(arr){
    let num1=arr.map(num=>num.toString());
    num1.sort((a,b)=>{
        return (b+a)-(a+b)
    });
    if(num1[0]==='0'){
        return "o"
    }
    return num1.join()
}
let arr=[54,546,548,60]
console.log(largestNumber(arr))

// 4 th question
function reverseNumber(num) {
    let reversed = 0;
    let isNegative = num < 0;
    num = Math.abs(num); 

    while (num > 0) {
        reversed = (reversed * 10) + (num % 10);
        num = Math.floor(num / 10);
    }
    console.log(reversed)

    // Trim leading zeros
   
    return reversed;
}
let num=889
console.log(reverseNumber(num))

// 5 th question
function findMinMax(arr) {
    if (arr.length === 0) {
        return null; 
    }

    let min = arr[0];
    let max = arr[0];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i]; 
        }
        if (arr[i] > max) {
            max = arr[i];
        }
    }

    return { min, max }; 
}


const numbers = [54,546,548,60];
const result = findMinMax(numbers);
console.log("Min:", result.min); // Output: Min: 1
console.log("Max:", result.max); // Output: Max: 9
