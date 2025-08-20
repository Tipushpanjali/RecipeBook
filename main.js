
let expand_btn = document.querySelectorAll(".expand-btn")
let expand = document.querySelectorAll(".expand")

let cooking = document.querySelectorAll(".cooking-btn")
let show_time = document.querySelectorAll(".time-show")
let reset = document.querySelectorAll(".reset")

let arrow_prep = document.querySelectorAll(".arrow-prep")
let arrow_inst = document.querySelectorAll(".arrow-inst")
let arrow_ingr = document.querySelectorAll(".arrow-ingr")

let prep_cont = document.querySelectorAll(".prep-content")
let inst_cont = document.querySelectorAll(".instruct-content")
let ingr_cont = document.querySelectorAll(".Ingre-content")

prep_cont.forEach((prep_cont)=>{
    prep_cont.classList.add('hide');
})
inst_cont.forEach((inst_cont)=>{
    inst_cont.classList.add('hide');
})
ingr_cont.forEach((ingr_cont)=>{
    ingr_cont.classList.add('hide');
})

arrow_prep.forEach((arrow_prep, index)=>{
    arrow_prep.addEventListener("click", () => {
    prep_cont[index].classList.toggle('hide');
    arrow_prep.classList.toggle("active")
});
});


arrow_inst.forEach((arrow_inst, index)=>{
    arrow_inst.addEventListener("click", () => {
    inst_cont[index].classList.toggle('hide');
    arrow_inst.classList.toggle("active")
});
})

arrow_ingr.forEach((arrow_ingr, index)=>{
    arrow_ingr.addEventListener("click", () => {
    ingr_cont[index].classList.toggle('hide');
    arrow_ingr.classList.toggle("active")
});
})

reset.forEach((res) => {
    res.classList.add("hide");
});

// Store timer data for each button
let timers = [];

function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}



function timing() {
    cooking.forEach((cook, index) => {
        // Initialize timer data for each button
        timers[index] = {
            timeLeft: 5,
            countdown: null,
            isRunning: false,
            initialTime: 5200,
        };

        cook.addEventListener("click", () => {
            // Prevent starting multiple timers for the same button
            if (timers[index].isRunning) {
                return;
            }

            // Show expand elements
            expand.forEach((exp) => {
                exp.classList.remove("hide");
            });

            // Start timer for this specific button
            timers[index].isRunning = true;
            timers[index].timeLeft = timers[index].initialTime; 
            
            
            timers[index].countdown = setInterval(() => {
                show_time[index].innerText = "Timer : " + formatTime(timers[index].timeLeft);
                reset[index].classList.remove("hide");
                console.log("Button " + index + " → " + timers[index].timeLeft);
                
                
                timers[index].timeLeft--;
                
                if (timers[index].timeLeft < 0) {
                    clearInterval(timers[index].countdown);
                    show_time[index].innerText = "time's up";
                    show_time[index].classList.add("red");
                    timers[index].isRunning = false;
                    console.log("Time's up for button " + index);
                }
            }, 1000);
        });
    });

    // Set up reset event listeners (outside the cooking loop)
    reset.forEach((resetBtn, index) => {
        resetBtn.addEventListener("click", () => {
            // Clear the specific timer
            if (timers[index].countdown) {
                clearInterval(timers[index].countdown);
            }
            
            // Reset timer data
             timers[index].timeLeft = timers[index].initialTime;
            timers[index].isRunning = false;
            
            // Reset UI
            show_time[index].innerText = "Timer";
            reset[index].classList.add("hide");
            show_time[index].classList.remove("red");
            
            console.log("Timer " + index + " reset");
        });
    });
}

timing();

expand.forEach((exp) => {
    exp.classList.add("hide");
})

expand_btn.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        expand[index].classList.toggle("hide");
 
    });
});
