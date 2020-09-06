let LelottUfokSzoveg=document.createElement("p");
document.body.appendChild(LelottUfokSzoveg);
LelottUfokSzoveg.innerHTML="Lelőtt UFO-k:";

let szamlalo=document.createElement("div");
document.body.appendChild(szamlalo);
szamlalo.id="scorecounter";
let scorevar = 0;

/* Az event paraméterben ezek lesznek átadva a függvénynek:
- hova kattintottunk:
    event.clientX
    event.clientY
- melyik egérgombbal event.button
- milyen elemre kattintottunk: event.target
 */

function spawnUfo(event) {
  /* létrehoz egy <img> tag-et, ez fogja tartalmazni a gif-et és az erre való
hivatkozást átadja a ufo változónak*/
  let ufo = document.createElement("img");
  /* Változtatja az <img> tag egyik attribútumár: src-nek beállítja a ufo.gif-et:*/
  ufo.src = "/img/ufo.gif";
  /* gyerekként hozzáadja a <body>-hoz a ufo.gif-et */
  document.body.appendChild(ufo);
  /* Cél, hogy oda tegye le a lovat ahova kattintunk, vagyis a ló pozíciója
legyen absolute (azaz mindentől független), a style.top és a style.left az
elem pozíciója az oldalon, az event.client X és Y pedig az egér pozíciója
kattintáskor*/

  ufo.style.position = "absolute";

  /* A clientHeight-tel megadja az ablak
magasságát: mivel Math-random-ot használ,
így véletlenszerű lesz, hogy hol, milyen
magasságban jelenik meg */

  ufo.style.top = document.body.clientHeight * Math.random() - 100 + "px";
  /* Az ufo-k ne kattintásra jöjjenek elő, hanem periodikusan
az oldal szélén: az oldal bal oldalától még 200 px-szel
balra */
  ufo.style.left = -200 + "px";

  /* Emiatt lesznek "lopakodó", alig látszó UFO-k */
  ufo.style.filter += "brightness(" + Math.random() + ")";

  ufok.push(ufo);

  /* mousedown: arra aktiválódik, ahogy lenyomod az egérgombot */
  ufo.addEventListener("mousedown", explode);

}

/* Ez a robbantó függvény, aminek van egy event paramétere */
function explode(event) {
  let ufo = event.target;
  /*Eltünteti az ufo-t mousedown-ra, vagyis az egérgomb lenyomására
és kiveszi az ufok tömbből is */
  document.body.removeChild(ufo);
  ufok.splice(ufok.indexOf(ufo), 1);
  
  scorevar = parseInt(scorevar) + 1;
  scorecounter.innerHTML = scorevar;


/* A lelőtt UFO-k számának kiírása*/
/* let numberDiv=document.createElement("div");
numberDiv.class="numberDiv";
document.body.appendChild(numberDiv);

numberOfExplodedUfos = 0;
ufo.addEventListener("click", countOfBlastedUfos);
function countOfBlastedUfos() {
  numberOfExplodedUfos=parseInt(numberOfExplodedUfos)+1;  
document.querySelector("#numberDiv").innerHTML=numberOfExplodedUfos;
} */


  /*Beteszi egy változóba a robbanás képét/gif-jét és hozzáadja a body-hoz */
  let bumm = document.createElement("img");

/* Alább az exlosion.webp fájlnév után szereplő
?a="+Math.random()" azt a célt szolgálja, hogy a böngésző
azt higgye, hogy 2 egymáshoz közeli robbanás két különböző
kép és ezért ne kimitálja csak az egyikrea a megjelenítést */

  bumm.src = "/img/explosion.webp?a="+Math.random();
  document.body.appendChild(bumm);
  bumm.style.position = "absolute";

  /*A style.top és a style.left az elem pozíciója
az oldalon, az event.client X és Y pedig az egér
pozíciója kattintáskor. A cél ezekkel az, hogy oda
tegye a bumm változóba rejtett robbanást, ahova
kattintunk*/
  bumm.style.top = event.clientY - 100 + "px";
  bumm.style.left = event.clientX - 100 + "px";

  /* pointerEvens "none"-ra állításának célja,
hogy a robbanáson "keresztül tudjunk kattintani",
vagyis ne takarja ki az alatta lévő ufo-t */
  bumm.style.pointerEvents = "none";

/* A robbanás hangja */
let blastsound = new Audio("/sound/exp.mp3");
blastsound.play();

 /* setTimeout-tal oldja meg hogy a robbanások eltűnjenek.
 A 7 azt jelenti hogy 700 ezredmásodperc múlva a body-ból
 remove-olja a bumm-ot, vagyis a robbanást. A setTimeout-nak 
 egy függvény az első paramétere, ezt a függvényt itt helyben
  definiálja */

setTimeout(function() {document.body.removeChild(bumm);}, 700);

}

/* Ettől fognak oldalra futni a ufok. A lovakat egy üres tömbben fogja
tárolni, a tömb neve: ufok. Minden alkalommal, amikor lerakunk egy
lovat bele push-olja a tömbbe. */

/* A setIntervallal x ezredmásodpercenként lefuttat újra egy függvényt.
A mindenmozgat a függvény neve, amit 10 ezredmásodpercenként újra és újra
le akar futtatni. A mindentmozgat függvényben van egy ciklus, ami végigmegy
a ufok tömbbön és style.left-et növeli 3-mal. Mivel a ufok tömbben
szövegként vannak tárolva az értékek -mint például a "13px"- ezért ahhoz,
hogy ehhez 3-at hozzá tudjon adni ezt számmá kell alakítani: ezt teszi a
parseInt*/

function mindentmozgat() {
  for (let i = 0; i < ufok.length; i++) {
    ufok[i].style.left = parseInt(ufok[i].style.left) + 7 + "px";
    /* Ír egy if-et arra, hogy ha kiment az ufo
      jobbra a képernyőről, akkor törölje, hogy ne
      foglalja a memóriát: ha az ufo style.left-je
      nagyobb, mint az ablak szélessége (vagyis a
        document.body.clientWidth), akkor a body-ból
        remove-olja az adott elemet */

    if (parseInt(ufok[i].style.left + "px") > document.body.clientWidth) {
      document.body.removeChild(ufok[i]);

      /* Az ufok tömbből is ki kell venni az elemet: a jelenlegi index-ről töröljön 1 elemet */

      ufok.splice(i, 1);

    }
  }
}

setInterval(mindentmozgat, 50);

/* Fél másodpercenként meghívja a spawnUfo függvényt*/

setInterval(spawnUfo, 1000);

let ufok = [];