 const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
    reveals.forEach((item) => {
        const top = item.getBoundingClientRect().top;

        if (top < window.innerHeight - 100) {
            item.classList.add("active");
        }
        else{
             item.classList.remove("active");
        }
        
    });
});
const zukat=document.querySelector(".line");
const start=document.querySelector(".start")
const goldin=document.querySelector(".pur")
 const goldinput=document.querySelector(".golds")
 const silverinput=document.querySelector(".silver")
 const cashinput=document.querySelector(".cash")
 const investmentinput=document.querySelector(".investment")
 const loansinput=document.querySelector(".loans")
 const debtinput=document.querySelector(".debt")
 const billinput=document.querySelector(".bills")
 const input=document.querySelectorAll(".input");
 input.forEach(input=>{
   input.addEventListener("input",zukatcalulation)
 })
 let goldmode="gram"
 let silvermode="gram"
 const pkr=document.querySelector(".pkr")

 const gram=document.querySelector(".gram")
  gram.classList.add("effect")

 gram.addEventListener("click",()=>{
     goldmode="gram"
    gram.classList.add("effect")
     pkr.classList.remove("effect")

     calculation()

 })
 pkr.addEventListener("click",()=>{
    pkr.classList.add("effect")
    gram.classList.remove("effect")
     goldmode="pkr"
     calculation()
 })
 function calculation(){
    if(goldmode==="gram"){
       let price= goldinput.value*16975;
       const gold=price||0; 
       const converstion=document.querySelector(".converstion3")
       converstion.innerText=`PKR${gold.toFixed(2)}`;

       const goldy=document.querySelector(".goldy")
   goldy.innerText=gold
    }
    else{
       let price= goldinput.value/16975;
       const gold=price||0; 
       const goldy=document.querySelector(".goldy")
       goldy.innerText=gold.toFixed(2)
       const converstion=document.querySelector(".converstion3")
       converstion.innerText=`${gold.toFixed(2)}grams`;
    }
 }


const pkr2=document.querySelector(".pkr2")

 const gram2=document.querySelector(".gram2")
 gram2.classList.add("effect")
 gram2.addEventListener("click",()=>{
    gram2.classList.add("effect")
     pkr2.classList.remove("effect")

     silvermode="gram"
     calculationsilver()

 })
 pkr2.addEventListener("click",()=>{
    pkr2.classList.add("effect")
    gram2.classList.remove("effect")
    silvermode="pkr"
     calculationsilver()
 })
 function calculationsilver(){
    if(silvermode==="gram"){
       let price= silverinput.value*400;
       const gold=price; 
       const converstion=document.querySelector(".converstion2")
       converstion.innerText=`PKR${gold.toFixed(2)}`;
       const silvers=document.querySelector(".silver")
       silvers.innerText=gold

    }
    else{
       let price= silverinput.value/400;
       const gold=price; 
       const silvers=document.querySelector(".silvers")
       silvers.innerText=`${gold.toFixed(2)}grams`
        const converstion=document.querySelector(".converstion2")
       converstion.innerText=`${gold.toFixed(2)}grams`;


    }
 }

 
 function zukatcalulation (){
 {
    if(goldmode==="gram"){
       let price= goldinput.value*16975;
       const gold=price; 
       const converstion=document.querySelector(".converstion3")
       converstion.innerText=`${gold.toFixed(2)}pkr`;

       const goldy=document.querySelector(".goldy")
   goldy.innerText=gold
    }
    else{
       let price= goldinput.value/16975;
       const gold=price; 
       const converstion=document.querySelector(".converstion3")
       converstion.innerText=`${gold.toFixed(2)}grams`;
       const goldy=document.querySelector(".goldy")
       goldy.innerText=gold.toFixed(2)

    }
 }
  {
    if(silvermode==="gram"){
       let price= silverinput.value*400;
       const silver=price; 
       const converstion=document.querySelector(".converstion2")
       converstion.innerText=`PKR${silver.toFixed(2)}`;
       const silvers=document.querySelector(".silvers")
       silvers.innerText=silver.toFixed(2)

    }
    else{
       let price= silverinput.value/400;
       const silver=price; 
       const converstion=document.querySelector(".converstion2")
       converstion.innerText=`${silver.toFixed(2)}grams`;
       const silvers=document.querySelector(".silvers")
       silvers.innerText=silver.toFixed(2)

    }
 }
let gold =0;
if(goldmode==="gram"){
     gold=Number(goldinput.value)*16975||0;
}
else{
     gold=Number(goldinput.value)||0;
}
let silver=0;
if(silvermode==="gram"){
     silver=Number(silverinput.value)*400||0;
}
else{
     silver=Number(silverinput.value)||0;
}

  const cash=Number(cashinput.value)||0; 
  const investment=Number(investmentinput.value)||0; 
  const loans=Number(loansinput.value)||0; 
  const debt=Number(debtinput.value)||0; 
  const bill=Number(billinput.value)||0; 
   const asset= gold+silver+cash+investment+loans;
   const dect=debt+bill;
   const total=asset-dect;
   console.log(total);
   const netwealth=document.querySelector(".netwealth")
   const fill=document.querySelector(".fill")
   netwealth.innerText=total.toLocaleString("en-PK");
   const nisab=245000;
   
   const debtbill=document.querySelector(".dbetbill")
   debtbill.innerText=`-${dect.toLocaleString("en-PK")}`;
   const back=document.querySelector(".back")
   back.innerText=loans;
   const invest=document.querySelector(".invest")
   invest.innerText=investment
   const saving=document.querySelector(".saving")
   saving.innerText=cash
   const silvers=document.querySelector(".silvers")
   silvers.innerText=silver
   const goldy=document.querySelector(".goldy")
   goldy.innerText=gold
   
   if(total>=nisab)
      {
       const result= total*0.025
       fill.innerText="Pakistani Rupees — Mashallah, may Allah accept your Zakat"
       zukat.innerText=result.toLocaleString("en-PK");
        start.innerText="Eligible for Zakat ✓";
        start.classList.add("right")
        start.classList.remove("line")
      }
      else{
        start.innerText="Below Nisab threshold (PKR 2,45,000)";
        start.classList.add("low")
        start.classList.remove("right")
        fill.innerText="Fill in your assets to see the result"
      }



 }
 const resetBtn=document.querySelector(".reset-btn")
resetBtn.addEventListener("click", () => {

    input.forEach(input => {
        input.value = "";
    });
    goldmode = "gram";
    silvermode = "gram";

    gram.classList.add("effect");
    pkr.classList.remove("effect");

    gram2.classList.add("effect");
    pkr2.classList.remove("effect");
    goldin.scrollIntoView({
      behavior:"smooth"
    })
    goldinput.focus();
       zukatcalulation();
   });
