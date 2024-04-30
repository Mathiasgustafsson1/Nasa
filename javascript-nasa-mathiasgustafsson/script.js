

//skapa ref till input
const aliasInput = document.querySelector('#aliasName');
const sendBtn = document.querySelector('#btn-submit');
const resultInput = document.querySelector('#resultElement');
const inputValue = aliasInput.value;
 
//Lyssnare till när man släpper en key-tangent
aliasInput.addEventListener('keyup', () => {
    //Vad ska hända när det släpper upp en key
    // console.log('du skrev något i input');
    //Hämta värdet i input
    // console.log(aliasInput.value);
    //Hämta längden på värdet i input
    // console.log(aliasInput.value.length);
    let getValueLength = aliasInput.value.length;
    //kontrollera så att user skrivit in fyra tecken
    //villkoret om getValueLength är större än 3
    if(getValueLength > 3){
        //om antalet tecken är större än 3
        console.log('det är större än 3 tecken');
        //btn ska bli enabled
        sendBtn.disabled = false
    }else{
        //om antalet  tecken är mindre än 3
        console.log('det är mindre än 3 tecken');
        //btn ska bli disabled
        sendBtn.disabled = true
    }
});
 
//lyssnare som lyssnar efter när input är i fokus
aliasInput.addEventListener('focus',() => {
    //Vad ska hända när input är i fokus
    //lägger till klassen focusBorder
    aliasInput.classList.toggle('focusBorder');
});
//lyssnare som lyssnar efter när input är i fokus
aliasInput.addEventListener('blur',() => {
    //Vad ska hända när input är i fokus
    //lägga till klassen focusBorder
    aliasInput.classList.toggle('focusBorder');
});
 
//lyssnare som lyssnar efter klick på btn
sendBtn.addEventListener('click', (event) =>{
    //vad ska hända vid klick
    //avbryter ebtns default beteende
    event.preventDefault();
    const inputValue = aliasInput.value;
    resultInput.textContent = "Welcome to Space " + inputValue + "!";
    aliasInput.value = '';
    //rensa input
    aliasInput.value ='';
    //kontrollera om aliasInput är tomt och sätt btn till disabled
    if(aliasInput.value === ''){
        //btn blir disabled
        sendBtn.disabled = true;
    }
});


const apiKey = 'HvyELAFaQ8CZJyXmjt8kTLXZ4Y2nh8aIHJj4EOg6';
const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=${apiKey}&sol=1000`;



fetch(apiUrl)
    .then(response => response.json())
    .then(data => {

        //sparar data.photos, namnet på datan i consolen i en variabel.
        //Curositydata är arrayen som innehåller foton
        const curiosityData = data.photos

        //const till container
        const cardContainer = document.querySelector('#curiosity');

        //är denna sann finns det data
        if (curiosityData.length !== 0) {

            //begränsa till 4 st
            const limitedData = curiosityData.slice(0, 4);

            limitedData.forEach(element => {
                //anropar på funktionen createCard, skapar upp ett nytt kort
                //För att skicka data till en funktion gör man det i element, lägger i en variabel från return
                //createCard(element)
                const newCard = createCard(element)
                //För att lägga till nya card i container
                cardContainer.append(newCard);


            });


        } else {
            // nytt h3-element för att visa meddelande
            const noDataMessage = document.createElement('h3');
            noDataMessage.textContent = 'We have data';
            // meddelande i container
            cardContainer.append(noDataMessage);
        }


        //Fel 
    }).catch(error => console.log(`Detta är felet: ${error}`));

    
//Här tar vi upp cardsen från html
//Gör funktion till anropet för att ta emot data
function createCard(element) {
    console.log('CreateCard kör');
    //gör const av elementen i html

    const article = document.createElement('article');
    //klass på article är nasa-card
    article.classList.add('nasa-card');
    const title = document.createElement('h3');
    const imgDiv = document.createElement('div');
    //klass på div är nasa-img
    imgDiv.classList.add('nasa-img');
    const img = document.createElement('img');
    const dateInfo = document.createElement('p');


    //för att lägga till datan från nasa
    title.textContent = element.rover.name;
    dateInfo.textContent = element.earth_date;
    img.src = element.img_src;
    
    imgDiv.append(img);
    //lägger till element i article
    article.append(title, imgDiv, dateInfo);
    imgDiv.append(img);


    //skicka kort tillbaka till loop
    return article;


}
  
