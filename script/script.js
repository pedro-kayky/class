
let storyIndex = 0;


const storyTexts = [

"こんにちは、若き錬金術師たち。",

"今日は特別な任務があります。",

"あなたたちは自分だけの魔法ポーションを作ります。",

"さあ、研究を始めましょう！"

];


let potion = {

    base:"",
    ingredient:"",
    effect:""

};



function startGame(){


document
.getElementById("start-screen")
.classList.add("hidden");


document
.getElementById("story")
.classList.remove("hidden");


document
.getElementById("dialogue")
.innerHTML =
storyTexts[storyIndex];


}



function nextStory(){


storyIndex++;


if(storyIndex < storyTexts.length){


document
.getElementById("dialogue")
.innerHTML =
storyTexts[storyIndex];


}

else{


document
.getElementById("story")
.classList.add("hidden");


document
.getElementById("lab")
.classList.remove("hidden");


}


}



function choose(type,value){


potion[type]=value;


console.log(potion);


}



function createPotion(){


if(
potion.base &&
potion.ingredient &&
potion.effect
){


document
.getElementById("lab")
.classList.add("hidden");


document
.getElementById("result")
.classList.remove("hidden");



let name =
potion.ingredient +
" " +
potion.effect;



document
.getElementById("potion-name")
.innerHTML =
"🌟 " + name;



document
.getElementById("potion-info")
.innerHTML =

`
Base: ${potion.base}<br>
Ingredient: ${potion.ingredient}<br>
Effect: ${potion.effect}

<br><br>

この魔法は特別な思い出を作ります。
`;



}

else{


alert(
"材料を全部選んでください！"
);


}


}