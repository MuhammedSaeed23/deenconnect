const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll",() => {
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
const shell=document.querySelector(".shellheader");
shell.style.display="none";
const head=document.querySelector(".shellhead")
const card=document.querySelectorAll(".duas")
card.forEach((card)=>{
    card.addEventListener("click",()=>{

        const category=card.dataset.category;
        fetch(`/Dua/${category}/`)
        .then(response=>response.json())
        .then(data=>{
       const container= document.querySelector(".duashell");

       let counter=1;
       container.innerHTML=""
        shell.style.display="flex";
            data.forEach( item =>{
                head.innerText=item.category;
             const card=document.createElement("div");
             card.classList.add("box");
             const count=document.createElement("div");
             count.innerText=counter;
             count.classList.add("icon");
             const heading=document.createElement("h3");
             heading.innerText=item.title;
             const ayat=document.createElement("div");
             ayat.innerText=item.arabic
             ayat.classList.add("surah");
             const translation=document.createElement("p");
             translation.innerText=item.translation;
             translation.classList.add("translate")
             const reference=document.createElement("div");
             reference.classList.add("reference")
             reference.innerText=item.reference;

card.appendChild(count);
card.appendChild(heading);
card.appendChild(ayat);
card.appendChild(translation);
card.appendChild(reference);
container.appendChild(card);
const footer=document.querySelector(".foot")
footer.scrollIntoView({
    behavior:"smooth"
})


       counter++;       
            })
            console.log(data);
        })
        .catch(error => console.error(error));
    });
});
const search=document.querySelector(".search")
search.addEventListener("change",()=>{

    const category=search.value;
    fetch(`/Dua/${category}`)
     .then(response=>response.json())
     .then(data=>{
        console.log(data)
       const container= document.querySelector(".duashell");

       let counter=1;
       container.innerHTML=""
        shell.style.display="flex";
            data.forEach( item =>{
                head.innerText=item.category;
             const card=document.createElement("div");
             card.classList.add("box");
             const count=document.createElement("div");
             count.innerText=counter;
             count.classList.add("icon");
             const heading=document.createElement("h3");
             heading.innerText=item.title;
             const ayat=document.createElement("div");
             ayat.innerText=item.arabic
             ayat.classList.add("surah");
             const translation=document.createElement("p");
             translation.innerText=item.translation;
             translation.classList.add("translate")
             const reference=document.createElement("div");
             reference.classList.add("reference")
             reference.innerText=item.reference;

card.appendChild(count);
card.appendChild(heading);
card.appendChild(ayat);
card.appendChild(translation);
card.appendChild(reference);
container.appendChild(card);
const footer=document.querySelector(".foot")
footer.scrollIntoView({
    behavior:"smooth"
})

       counter++;       
            })
            console.log(data);
        })
        .catch(error => console.error(error));
    });




