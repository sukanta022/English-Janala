const displayLesson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((data) => displayLessonData(data.data))
}

const removeClass = () =>{
    const lsnbtns = document.querySelectorAll(".lesson");
    lsnbtns.forEach((lsnbtn) => lsnbtn.classList.remove("active"));
}

const loadWord = (id) => {
    url = `https://openapi.programming-hero.com/api/word/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => loadWordDetails(data.data));
    document.getElementById("my_modal_5").showModal();
}

const loadWordDetails = (data) => {
    const wordDetailsContainer = document.getElementById("word-details-container");
    wordDetailsContainer.innerHTML = "";
    div = document.createElement("div");
    div.innerHTML = `
        <p class="font-semibold text-4xl mb-8">${data.word} (<i class="bi bi-mic-fill"></i> :${data.pronunciation})</p>

            <p class="text-2xl space-y-3 mb-8"><span class="font-semibold">Meaning</span><br><span class="font-bangla">${data.meaning}</span></p>

            <p class="text-2xl space-y-3 mb-8"><span class="font-semibold">Example</span><br><span class="text-[#000000]">${data.sentence}</span></p>

            <p class="text-2xl mb-2 font-bangla">সমার্থক শব্দ গুলো</p>
            <div class="text-[#000000] flex gap-3">
                <p class="border border-[#D7E4EF] bg-[#EDF7FF] p-1">${data.synonyms[0]}</p>
                <p class="border border-[#D7E4EF] bg-[#EDF7FF] p-1">${data.synonyms[1]}</p>
                <p class="border border-[#D7E4EF] bg-[#EDF7FF] p-1">${data.synonyms[2]}</p>
            </div>
    `
    wordDetailsContainer.append(div);
}

const lessonLevel = (level) =>{
    url = `https://openapi.programming-hero.com/api/level/${level}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            displayLessonWords(data.data);
            removeClass();
            btn = document.getElementById(`lesson-btn-${level}`);
            console.log(btn);
            btn.classList.add("active");
        })
}

const displayLessonData = (data) => {
    const lessonContainer = document.getElementById("lesson-container");
    
    lessonContainer.innerHTML = "";
    data.forEach(element => {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
            <buttton onclick ="lessonLevel(${element.level_no})" id="lesson-btn-${element.level_no}" class="btn btn-soft btn-primary lesson"><i class="bi bi-book-half"></i> Lesson -${element.level_no}</button>
        `;
        lessonContainer.append(btnDiv);
    });
}

const displayLessonWords = (data) => {
    const lessonWordsContainer = document.getElementById("lesseonWords-container");
    lessonWordsContainer.innerHTML = "";
    console.log(data.length);
    if(data.length == 0){
        lessonWordsContainer.innerHTML = `
            <div class="font-bangla flex flex-col justify-center items-center col-span-3 space-y-4">
                <img src="./assets/alert-error.png" class="mx-auto">
                <p class="text-[#79716B] text-[14px]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <p class="text-4xl text-[#292524]">নেক্সট Lesson এ যান</p>
            
            </div>
        `
    }
    else{
        data.forEach(element => {
        const wordDiv = document.createElement("div");
        wordDiv.innerHTML = `
            <div id="lesson-word" class="bg-white p-14 space-y-4 shadow-md h-full flex flex-col">
                <p class="font-bold text-3xl text-center">${element.word ? element.word : "শব্দ পাওয়া যায়নি"}</p>
                <p class="text-center">Meaning / Pronunciation</p>
                <p class="font-bangla font-semibold text-3xl text-[#18181B] text-center">
                    "${element.meaning ? element.meaning : "অর্থ পাওয়া যায়নি"} / ${element.pronunciation ? element.pronunciation : "উচ্চারণ পাওয়া যায়নি"}"
                </p>
            
            <!-- Flex container at bottom -->
            <div class="flex justify-between items-center mt-auto pt-6">
                <button class="bg-[#1A91FF]/10 px-2 py-1 text-[#374957] text-2xl cursor-pointer hover:bg-[#1A91FF]/30" onclick="loadWord(${element.id})">
                <i class="bi bi-info-circle-fill"></i>
                </button>
                <button class="bg-[#1A91FF]/10 px-2 py-1 text-[#374957] text-2xl cursor-pointer hover:bg-[#1A91FF]/30">
                <i class="bi bi-volume-up-fill"></i>
                </button>
            </div>
            </div>

        `
        lessonWordsContainer.append(wordDiv);
    })
    }
    
}

displayLesson();