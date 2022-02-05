const htmlCategories = `
    <div class="cell-cat">
        <div class="en-cat"></div>
        <img src="" alt="" class="img-cat" height="150" width="150">
        <div class="vn-cat"></div>
    </div>`;

const htmlFlaschards = `
    <div class="cell-flashcard">
        <div class="flashcard-top flex-row">
            <div class="flashcard-en"></div>
            <span class="material-icons audio-icon-flashcard">volume_up</span>
            <audio class="audio-flashcard"></audio>
        </div>
        <div class="flashcard-phonetic"></div>
        <img src="" alt="" class="flashcard-image circle" height="150" width="150">
        <div class="flashcard-vn"></div>
    </div>`;


const scrollTop = () => {
  window.scrollTo(0, 0);
};

function goBack() {
  document.location.href="../";
}

function playAudio(strId) {
  console.log("Play this audio for id = " + strId);
  const elAudio = document.getElementById(strId);
  elAudio.play();
}

const loadFlashcard = (category) => {
  console.log(category);

  /// change background
  const elBody = document.getElementsByTagName("body")[0];
  elBody.removeAttribute("class");
  elBody.classList.add("background-flashcards");

  /// hide categories main and show flaschard main
  document.querySelector(".main-categories").classList.toggle("noDisplay");
  document.querySelector(".main-flashcards").classList.toggle("noDisplay");

  /// get data for specific category
  const categoryData = $gblData.filter((data) => data.category === category)[0];

  /// populate top menu with category name and image
  document.querySelector(".main-flashcards-header-en").innerText = categoryData.category_title;
  document.querySelector(".main-flashcards-header-img").src = categoryData.category_image;

  /// create elements for each word in category from JSON daata & add unique data to each element
  const el = document.querySelector(".flashcards");
  categoryData.category_words.forEach((wordData, index) => {
    el.insertAdjacentHTML("beforeend", htmlFlaschards);
    document.getElementsByClassName("cell-flashcard")[index].setAttribute("onclick", "playAudio('audio-" + wordData.en + "')");
    document.getElementsByClassName("flashcard-en")[index].innerText = wordData.en;
    const elAudio = document.getElementsByClassName("audio-flashcard")[index];
    elAudio.src = wordData.audio;
    elAudio.id = "audio-" + wordData.en;
    document.getElementsByClassName("audio-icon-flashcard")[index].setAttribute("onclick", "playAudio('audio-" + wordData.en + "')");
    document.getElementsByClassName("flashcard-phonetic")[index].innerText = wordData.pron;
    document.getElementsByClassName("flashcard-image")[index].src = wordData.img;
    document.getElementsByClassName("flashcard-vn")[index].innerText = wordData.vn;
  });


  /// show back button
  document.querySelector(".nav-back").classList.toggle("noDisplay");

  scrollTop();
};

const addCategoriesToDOM = () => {
  /// helper function to capitalize first letter of string
  const capitalizeFirstLetter = (str) => {
    return str[0].toUpperCase() + str.substring([1], str.length);
  };

  /// create elements for every category from JSON data & add unique data to each element
  const el = document.querySelector(".categories");
  $gblData.forEach((cat, index) => {
    el.insertAdjacentHTML("beforeend", htmlCategories);
    const elThisChild = el.children[index];
    elThisChild.id = "cat_" + cat.category;
    elThisChild.children[0].innerText = capitalizeFirstLetter(
      cat.category_title
    );
    elThisChild.children[1].src = cat.category_image;
    elThisChild.children[2].innerText = capitalizeFirstLetter(cat.category_vn);
    elThisChild.addEventListener("click", (e) => {
      loadFlashcard(e.target.id.substring(4));
    });
  });
};

window.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
  addCategoriesToDOM();
});
