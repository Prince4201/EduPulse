/* Research Details Table */
const researchTable = document.querySelector(".main");

const research = [
  {
    title: "Math Quiz",
    authors: "Test Your Skills With Our Math Quiz",
    conferences: "Helps Students Improve Their Math Skills",
    citebox: "popup1",
    image: "https://tse3.mm.bing.net/th?id=OIP.9srbzZ38iSbrhY7eRiLxqwHaE7&pid=Api&P=0&h=180",
    abstract: "This is currently left empty and can be considered as dummy data 1",
    absbox: "absPopup1",
    subject: "Math"
  },

  {
    title: "English Quiz",
    authors: "Test Your Skills With Our English Quiz",
    conferences: "Helps Students Improve Their English Skills",
    citebox: "popup2",
    image: "https://tse2.mm.bing.net/th?id=OIP.U-nCfkrhV3MFwhDlE4YyTAHaGL&pid=Api&P=0&h=180",
    abstract: "This is currently left empty and can be considered as dummy data 2",
    absbox: "absPopup2",
    subject: "English"
  },

  {
    title: "Science Quiz",
    authors: "Test Your Skills With Our Science Quiz",
    conferences: "Helps Students Improve Their Science Skills",
    citebox: "popup3",
    image: "https://tse3.mm.bing.net/th?id=OIP.iFbUqtnyUMhVp96c0VUergHaEK&pid=Api&P=0&h=180",
    abstract: "This is currently left empty and can be considered as dummy data 3",
    absbox: "absPopup3",
    subject: "Science"
  },

  {
    title: "General Knowledge Quiz",
    authors: "Test Your Skills With Our GK Quiz",
    conferences: "Enhance Your General Knowledge and Awareness",
    citebox: "popup4",
    image: "https://tse2.mm.bing.net/th?id=OIP.hvqEs1IAEURkXLF8cc55lwHaD4&pid=Api&P=0&h=180",
    abstract: "This is currently left empty and can be considered as dummy data 4",
    absbox: "absPopup4",
    subject: "General Knowledge"
  }
];

AOS.init();

const fillData = () => {
  let output = "";
  research.forEach(({ image, title, authors, conferences, citebox, absbox, abstract, subject }) =>
    (output += `
            <tr data-aos="zoom-in-left"> 
                <td class="imgCol"><img src="${image}" class="rImg"></td>
                <td class="researchTitleName">
                    <div class="img-div">
                        <span class="imgResponsive">
                            <img src="${image}" class="imgRes">
                        </span>
                    </div>
                    <a href="javascript:void(0)" onclick="redirectToQuiz('${subject}')" class="paperTitle"> ${title} </a> 
                    <div class="authors"> ${authors} </div> 
                    <div class="rConferences"> ${conferences} </div>
                    
                    <!-- TAKE QUIZ BUTTON -->
                    <div class="d-flex" style="margin-right:5%;">
                        <button class="button button-accent button-small text-right" type="button" onclick="redirectToQuiz('${subject}')">
                            Take Quiz
                        </button>
                    </div>
                </td>
            </tr>`)
  );
  researchTable.innerHTML = output;
};

document.addEventListener("DOMContentLoaded", fillData);

// Function to redirect to the appropriate quiz page based on subject
function redirectToQuiz(subject) {
  let quizPage = "";

  switch (subject) {
    case "Math":
      quizPage = "mathquiz.html";
      break;
    case "English":
      quizPage = "englishquiz.html";
      break;
    case "Science":
      quizPage = "science.html";
      break;
    case "General Knowledge":
      quizPage = "gkquiz.html";
      break;
    default:
      quizPage = "defaultquiz.html"; // Fallback page
  }
  
  window.location.href = quizPage; // Redirect to the selected quiz page
}
