const displayLesson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((data) => displayLessonData(data.data))
}

const displayLessonData = (data) => {
    const lessonContainer = document.getElementById("lesson-container");
    
    lessonContainer.innerHTML = "";
    data.forEach(element => {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
            <buttton class="btn btn-soft btn-primary"><i class="bi bi-book-half"></i> Lesson -${element.level_no}</button>
        `;
        lessonContainer.append(btnDiv);
    });
}

displayLesson();