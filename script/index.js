const displayLesson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((data) => displayLessonData(data.data))
}

const lessonLevel = (level) =>{
    url = `https://openapi.programming-hero.com/api/level/${level}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayLessonWords(data.data))
}

const displayLessonData = (data) => {
    const lessonContainer = document.getElementById("lesson-container");
    
    lessonContainer.innerHTML = "";
    data.forEach(element => {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
            <buttton onclick ="lessonLevel(${element.level_no})" class="btn btn-soft btn-primary"><i class="bi bi-book-half"></i> Lesson -${element.level_no}</button>
        `;
        lessonContainer.append(btnDiv);
    });
}

const displayLessonWords = (data) => {
    const lessonWordsContainer = document.getElementById("lesseonWords-container");
    lessonWordsContainer.innerHTML = "";

    data.forEach(element => {
        const wordDiv = document.createElement("div");
        wordDiv.innerHTML = `
            <div id="lesson-word" class="bg-white text-center p-14 space-y-4 shadow-md h-full">
                <p class="font-bold text-3xl">${element.word}</p>
                <p>Meaning /Pronounciation</p>
                <p class="font-bangla font-semibold text-3xl text-[#18181B]">"${element.meaning} / ${element.pronunciation}"</p>
            </div>
        `
        lessonWordsContainer.append(wordDiv);
    })
}

displayLesson();